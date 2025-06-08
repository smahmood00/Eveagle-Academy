import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

// Define the API version type to match your current version
type StripeApiVersion = '2025-04-30.basil';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil' as any,
});

export async function createStripeSession({
  courseId,
  courseTitle,
  price,
  userId,
  studentType,
  studentId,
  successUrl,
  cancelUrl,
}: {
  courseId: string;
  courseTitle: string;
  price: number;
  userId: string;
  studentType: 'User' | 'Child';
  studentId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  // Create a Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: courseTitle,
          },
          unit_amount: Math.round(price * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      courseId,
      userId,
      studentType,
      studentId,
    },
  });

  return session;
} 