// Checkout.tsx (recommended)
'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '../../../lib/convertToSubcurrency';
import CheckoutPage from '@/components/layouts/CheckoutPage';
import useAuthCart from '@/hooks/useAuthCart';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/navigation';
import LoadWheel from '@/components/ui/LoadWheel';
import { User } from 'firebase/auth';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Checkout() {
  const [user, loadingAuth] = useAuthState(auth);
  const [authCart, loadingCart] = useAuthCart(user as User);
  const router = useRouter();

  // wait until authCart is resolved
  if (loadingAuth || loadingCart) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadWheel />
      </div>
    );
  }

  // protect from unauth users
  if (!user) {
    router.replace('/login');
    return null;
  }

  const authCartTotal = authCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!authCartTotal || authCartTotal <= 0) {
    // protect from unauth users
    router.replace('/my-cart');
    return null;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        amount: convertToSubcurrency(authCartTotal),
        currency: 'usd',
      }}>
      <CheckoutPage />
    </Elements>
  );
}
