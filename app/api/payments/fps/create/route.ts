import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth/verify';
import { connectToDB } from '@/lib/db/connect';
import { Payment, IPayment } from '@/lib/db/models/payment';
import Course, { ICourse } from '@/lib/db/models/course';
import { Types } from 'mongoose';

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
      return NextResponse.json({
        paymentId: existingPayment._id,
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