import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';
import { generateOrderNumber } from '@/app/lib/utils';

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const userId = paymentIntent.metadata.userId;
      const amount = paymentIntent.amount / 100;
      const items = JSON.parse(paymentIntent.metadata.cartItems);

      // Write receipt using Admin SDK
      await db.collection('receipts').add({
        orderNumber: generateOrderNumber(),
        userId,
        amount,
        items,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Clear user's cart
      const cartItemsRef = db.collection('carts').doc(userId).collection('cartItems');
      const snapshot = await cartItemsRef.get();

      const batch = db.batch();
      snapshot.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('⚠️ Webhook error:', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }
}
