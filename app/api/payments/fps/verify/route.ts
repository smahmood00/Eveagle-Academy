import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth/verify';
import { connectToDB } from '@/lib/db/connect';
import { Payment, IPayment } from '@/lib/db/models/payment';
import { Enrollment, IEnrollment } from '@/lib/db/models/enrollment';
import Course, { ICourse } from '@/lib/db/models/course';
import { User } from '@/lib/db/models/user';
import { Child } from '@/lib/db/models/child';
import { Types } from 'mongoose';
import { sendCourseEnrollmentEmail } from '@/lib/email/sendEmail';

export async function POST(request: Request) {
  try {
    const userId = await verifyAuth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Add admin check here
    // const user = await User.findById(userId);
    // if (!user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    await connectToDB();

    // Find and update the payment
    const payment = await Payment.findById(paymentId) as IPayment;
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    if (payment.status !== 'pending') {
      return NextResponse.json(
        { error: 'Payment is not in pending status' },
        { status: 400 }
      );
    }

    // Update payment status
    payment.status = 'completed';
    payment.completedAt = new Date();
    payment.fpsVerifiedAt = new Date();
    await payment.save();

    // Find the enrollment
    const enrollment = await Enrollment.findOne({
      courseId: payment.courseId,
      status: 'dropped'
    }) as IEnrollment;

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Update enrollment status
    enrollment.status = 'active';
    await enrollment.save();

    // Get course details
    const course = await Course.findById(payment.courseId) as ICourse;
    
    // Get user details
    const user = await User.findById(payment.userId);
    
    // Get student details (either user or child)
    let studentName = '';
    let studentEmail = '';
    
    if (enrollment.studentType === 'user') {
      studentName = `${user?.firstName} ${user?.lastName}`;
      studentEmail = user?.email || '';
    } else {
      const child = await Child.findById(enrollment.studentId);
      studentName = `${child?.firstName} ${child?.lastName}`;
      studentEmail = user?.email || ''; // Use parent's email for child enrollments
    }

    // Send confirmation email
    if (studentEmail && course) {
      await sendCourseEnrollmentEmail({
        email: studentEmail,
        courseName: course.title,
        studentName,
        paymentMethod: 'fps',
        amount: payment.amount,
        currency: payment.currency
      });
      console.log('✅ FPS payment verification confirmation email sent');
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and enrollment activated'
    });

  } catch (error: any) {
    console.error('Error verifying FPS payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    );
  }
} 