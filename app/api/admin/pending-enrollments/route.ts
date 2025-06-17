import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db/connect';
import { verifyAdminAuth } from '@/lib/auth/verifyAdmin';
import { Payment } from '@/lib/db/models/payment';
import { Enrollment } from '@/lib/db/models/enrollment';
import { User } from '@/lib/db/models/user';
import { Child } from '@/lib/db/models/child';

export async function GET(request: Request) {
  try {
    const adminId = await verifyAdminAuth();
    if (!adminId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();

    // Find all pending FPS payments
    const pendingPayments = await Payment.find({
      status: 'pending',
      paymentMethod: 'fps'
    }).populate('courseId');

    // Get all associated enrollments
    const enrollments = await Promise.all(
      pendingPayments.map(async (payment) => {
        const enrollment = await Enrollment.findOne({
          courseId: payment.courseId,
          status: 'dropped'
        });

        if (!enrollment) return null;

        // Get student details
        let student;
        if (enrollment.studentType === 'user') {
          student = await User.findById(enrollment.studentId);
        } else {
          student = await Child.findById(enrollment.studentId);
        }

        if (!student) return null;

        return {
          _id: enrollment._id,
          courseId: {
            _id: payment.courseId._id,
            title: payment.courseId.title
          },
          studentId: {
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName
          },
          paymentId: {
            _id: payment._id,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            createdAt: payment.createdAt
          }
        };
      })
    );

    // Filter out null values and return valid enrollments
    const validEnrollments = enrollments.filter(e => e !== null);

    return NextResponse.json({
      enrollments: validEnrollments
    });
  } catch (error: any) {
    console.error('Error fetching pending enrollments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 