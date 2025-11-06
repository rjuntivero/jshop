import { CartItem } from '@/hooks/useAuthCart';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, user, cart } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: user?.uid ?? 'guest',
        cartItems: JSON.stringify(
          cart.map((item: CartItem) => ({ id: item.id, quantity: item.quantity }))
        ),
      },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Internal Error:', err);
    return NextResponse.json({ error: `Internal Server Error: ${err}` }, { status: 500 });
  }
}
