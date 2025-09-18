'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '../../../lib/convertToSubcurrency';
import CheckoutPage from '@/components/layouts/CheckoutPage';
import { useAppSelector } from '@/state/hooks';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const ShoppingCart = () => {
  const cartTotal = useAppSelector((state) => state.cart.totalPrice);

  return (
    <Elements stripe={stripePromise} options={{ mode: 'payment', amount: convertToSubcurrency(cartTotal), currency: 'usd' }}>
      <CheckoutPage />
    </Elements>
  );
};

export default ShoppingCart;
