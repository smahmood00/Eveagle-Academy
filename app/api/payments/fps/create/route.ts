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

    const {
      courseSlug,
      purchaseType,
      studentId, // This will be userId for self-purchase or childId for child purchase
    } = await request.json();

    await connectToDB();

    // Get course details
    const course = await Course.findOne({ slug: courseSlug }) as ICourse;
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check for existing pending FPS payment
    const existingPayment = await Payment.findOne({
      userId: new Types.ObjectId(userId),
      courseId: course._id,
      status: 'pending',
      paymentMethod: 'fps'
    });

    if (existingPayment) {
      // Check for existing enrollment
      const existingEnrollment = await Enrollment.findOne({
        studentId: new Types.ObjectId(studentId),
        courseId: course._id
      });

      return NextResponse.json({
        paymentId: existingPayment._id,
        enrollmentId: existingEnrollment?._id,
        amount: existingPayment.amount,
        status: existingPayment.status,
        alreadyPending: true
      });
    }

    // Create payment record for FPS
    const payment = await Payment.create({
      userId: new Types.ObjectId(userId),
      courseId: course._id,
      amount: course.price,
      currency: 'HKD',
      status: 'pending',
      paymentMethod: 'fps',
    }) as IPayment;

    // Check for existing enrollment
    const existingEnrollment = await Enrollment.findOne({
      studentId: new Types.ObjectId(studentId),
      courseId: course._id
    });

    let enrollment: IEnrollment | null = null;

    if (!existingEnrollment) {
      // Convert purchaseType to match enrollment model's studentType enum
      const enrollmentStudentType = purchaseType.toLowerCase() === 'myself' ? 'user' : 'child';

      // Create enrollment with dropped status (will be updated to active when payment is verified)
      enrollment = await Enrollment.create({
        studentId: new Types.ObjectId(studentId),
        studentType: enrollmentStudentType,
        courseId: course._id,
        status: 'dropped', // Will be updated to 'active' when payment is verified
        enrollmentDate: new Date()
      }) as IEnrollment;

      // Get user details
      const user = await User.findById(userId);
      
      // Get student details (either user or child)
      let studentName = '';
      let studentEmail = '';
      
      if (enrollmentStudentType === 'user') {
        studentName = `${user?.firstName} ${user?.lastName}`;
        studentEmail = user?.email || '';
      } else {
        const child = await Child.findById(studentId);
        studentName = `${child?.firstName} ${child?.lastName}`;
        studentEmail = user?.email || ''; // Use parent's email for child enrollments
      }

      // Send confirmation email
      if (studentEmail) {
        await sendCourseEnrollmentEmail({
          email: studentEmail,
          courseName: course.title,
          studentName,
          paymentMethod: 'fps',
          amount: course.price,
          currency: 'HKD'
        });
        console.log('✅ FPS payment confirmation email sent');
      }

      return NextResponse.json({
        paymentId: payment._id,
        enrollmentId: enrollment._id,
        amount: payment.amount,
        status: payment.status,
        alreadyPending: false
      });
    }

    return NextResponse.json({
      paymentId: payment._id,
      amount: payment.amount,
      status: payment.status,
      alreadyPending: false
    });
  } catch (error: any) {
    console.error('Error creating FPS payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment record' },
      { status: 500 }
    );
  }
} 