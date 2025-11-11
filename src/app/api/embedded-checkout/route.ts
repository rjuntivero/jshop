import { NextResponse } from 'next/server';
import { Product } from '@/types/Product';
import { stripe } from '@/app/lib/stripe';

export async function POST(req: Request) {
  try {
    const { cart, user } = await req.json();

    // Create line items from your cart
    const line_items = cart.map((item: Product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    console.log('Customer email:', user?.email);
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: user?.email,
      metadata: {
        cart: JSON.stringify(
          cart.map((item: Product) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            category: item.category,
            shippingInformation: item.shippingInformation,
            thumbnail: item.thumbnail,
            returnPolicy: item.returnPolicy,
          }))
        ),
      },
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (err: unknown) {
    console.error('Error creating checkout session:', err);
    if (err instanceof Error) {
      return NextResponse.json({ error: `Internal Server Error: ${err.message}` }, { status: 500 });
    }
  }
}
