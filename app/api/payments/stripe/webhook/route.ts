import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payment/stripe';
import { connectToDB } from '@/lib/db/connect';
import { Types } from 'mongoose';
import Stripe from 'stripe';
import { Payment, IPayment } from '@/lib/db/models/payment';
import { Enrollment, IEnrollment } from '@/lib/db/models/enrollment';

// This is your Stripe CLI webhook secret for testing your endpoint locally
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// This is needed to disable body parsing, as we need the raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
  runtime: 'edge'
};

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
    },
  });
}

export async function POST(request: Request) {
  try {
    // Get the raw request body
    const text = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      console.error('⚠️ No stripe signature found in request headers');
      return NextResponse.json(
        { error: 'No stripe signature found in request headers' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      // Construct and verify the event
      event = stripe.webhooks.constructEvent(text, sig, webhookSecret);
      console.log('✅ Webhook signature verified successfully');
    } catch (err: any) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      console.log('Processing checkout.session.completed event');
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Session details:', {
        id: session.id,
        metadata: session.metadata,
        customer: session.customer,
        amount_total: session.amount_total
      });

      try {
        await connectToDB();
        console.log('Connected to DB');

        // Get metadata from session
        const { courseId, userId, studentType, studentId } = session.metadata || {};
        console.log('Extracted metadata:', { courseId, userId, studentType, studentId });
        
        if (!courseId || !userId || !studentType || !studentId) {
          console.error('Missing metadata:', { courseId, userId, studentType, studentId });
          throw new Error('Missing required metadata in Stripe session');
        }

        // First find the payment record
        const payment = await Payment.findOne({ stripeSessionId: session.id }) as IPayment | null;

        if (!payment) {
          console.log('Creating new payment record...');
          await Payment.create({
            userId: new Types.ObjectId(userId),
            courseId: new Types.ObjectId(courseId),
            stripeSessionId: session.id,
            amount: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency?.toUpperCase() || 'HKD',
            status: 'completed',
            paymentMethod: 'credit',
            completedAt: new Date()
          });
          console.log('✅ New payment record created');
        } else {
          console.log('Updating existing payment record...');
          payment.status = 'completed';
          payment.completedAt = new Date();
          await payment.save();
          console.log('✅ Payment record updated');
        }

        // Check if enrollment already exists
        const existingEnrollment = await Enrollment.findOne({
          studentId: new Types.ObjectId(studentId),
          courseId: new Types.ObjectId(courseId)
        }) as IEnrollment | null;

        if (existingEnrollment) {
          console.log('Enrollment already exists');
          return NextResponse.json({ received: true });
        }
        console.log('Creating new enrollment...');

        // Convert studentType to match enum values exactly
        const enrollmentStudentType = studentType.toLowerCase() === 'myself' ? 'user' : 'child';
        console.log('Creating enrollment with studentType:', enrollmentStudentType, typeof enrollmentStudentType);

        // Create new enrollment
        const newEnrollment = await Enrollment.create({
          studentId: new Types.ObjectId(studentId),
          studentType: enrollmentStudentType,
          courseId: new Types.ObjectId(courseId),
          status: 'active',
          enrollmentDate: new Date()
        });

        console.log('✅ Enrollment created successfully:', newEnrollment);
        return NextResponse.json({ received: true });
      } catch (dbError: any) {
        console.error('⚠️ Database operation failed:', dbError.message);
        // Still return 200 to acknowledge receipt
        return NextResponse.json({ received: true });
      }
    }

    // Return a 200 response for other event types
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('⚠️ Webhook error:', error.message);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 