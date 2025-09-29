'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '../../../lib/convertToSubcurrency';
import CheckoutPage from '@/components/layouts/CheckoutPage';
import { useAppSelector } from '@/state/hooks';
import CheckoutItem from '@/components/ui/CheckoutItem';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const Checkout = () => {
  const cartTotal = useAppSelector((state) => state.cart.totalPrice);
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: 'payment', amount: convertToSubcurrency(cartTotal), currency: 'usd' }}>
      <CheckoutPage />
    </Elements>
  );
};

export default Checkout;
