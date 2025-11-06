import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/app/firebaseConfig';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    // Handle payment success
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const userId = paymentIntent.metadata.userId;
      const amount = paymentIntent.amount / 100;

      // Create receipt in Firestore
      await addDoc(collection(db, 'receipts'), {
        userId,
        amount,
        timestamp: new Date(),
        items: JSON.parse(paymentIntent.metadata.cartItems),
      });

      // Clear user's cart
      const cartRef = doc(db, 'carts', userId);
      await deleteDoc(cartRef);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('⚠️ Webhook error:', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }
}
