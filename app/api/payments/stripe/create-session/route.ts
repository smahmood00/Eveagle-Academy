import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth/verify';
import { connectToDB } from '@/lib/db/connect';
import { createStripeSession } from '@/lib/payment/stripe';
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

    // Create success and cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/checkout/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/checkout/${courseSlug}`;

    // Create Stripe session
    const session = await createStripeSession({
      courseId: course._id.toString(),
      courseTitle: course.title,
      price: course.price,
      userId,
      studentType: purchaseType === 'myself' ? 'User' : 'Child',
      studentId: studentId,
      successUrl,
      cancelUrl,
    });

    // Create payment record
    const payment = await Payment.create({
      userId: new Types.ObjectId(userId),
      courseId: course._id,
      stripeSessionId: session.id,
      amount: course.price,
      currency: 'HKD',
      status: 'pending',
      paymentMethod: 'credit',
    }) as IPayment;

    return NextResponse.json({
      sessionId: session.id,
      sessionUrl: session.url,
    });
  } catch (error: any) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment session' },
      { status: 500 }
    );
  }
} 