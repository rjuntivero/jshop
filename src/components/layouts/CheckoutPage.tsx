'use client';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import CheckoutItemList from '@/components/ui/CheckoutItemList';
import Subtotal from '@/components/ui/Subtotal';
import AddressForm from '@/components/layouts/AddressForm';
import LoadWheel from '@/components/ui/LoadWheel';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebaseConfig';
import useAuthCart from '@/hooks/useAuthCart';
import { useAppSelector } from '@/state/hooks';
import { useEffect, useState } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { User } from 'firebase/auth';
import { Product } from '@/types/Product';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const [authCart, loadingCart] = useAuthCart(user ?? null);

  const guestCart = useAppSelector((state) => state.cart.items);
  const guestCartTotal = useAppSelector((state) => state.cart.totalPrice);

  const cart = user ? authCart : guestCart;
  const cartTotal = user
    ? authCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : guestCartTotal;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!cart.length || !user) return;

      setLoading(true);
      try {
        const res = await fetch('/api/embedded-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart, user }),
        });
        const data = await res.json();
        setClientSecret(data.client_secret);
      } catch (err) {
        console.error('Failed to fetch client secret', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [cart, user]);

  if (loadingAuth || loadingCart) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadWheel />
      </div>
    );
  }

  if (!user && !guestCart.length) {
    return <div className="flex justify-center items-center h-screen">Your cart is empty</div>;
  }

  return (
    <>
      <Navbar />
      <main className="text-primary-light min-h-screen flex p-6 gap-4 ">
        {/* Items Column */}
        {/* <article className="flex-1 flex flex-col gap-2 rounded-sm bg-secondary-dark p-4 shadow-md">
          <header className="flex justify-between items-center">
            <h1 className="font-sub-header font-semibold text-[clamp(1rem,2vw,1.3rem)]">
              Review Items:
            </h1>
            <Subtotal totalItems={totalItems} cartTotal={cartTotal ?? 0} />
          </header>
          <CheckoutItemList user={user} />
          <Subtotal totalItems={totalItems} cartTotal={cartTotal ?? 0} />
        </article> */}

        {/* Checkout / Payment Column */}
        <section className=" flex flex-1">
          {/* <article className="flex flex-col gap-4 text-secondary-light outline-secondary-light/50 rounded-sm bg-secondary-dark p-8 font-semibold outline-1">
            <h1 className="text-2xl text-primary-light">1. Shipping Details</h1>
            <hr className="w-full" />
            <AddressForm />
            <hr className="w-full" />

            <h1 className="text-2xl text-primary-light">2. Payment Method</h1>
            {loading && (
              <div className="flex h-[100px] items-center justify-center">
                <LoadWheel />
              </div>
            )}

            
          </article> */}
          {clientSecret && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
              <EmbeddedCheckout className="flex" />
            </EmbeddedCheckoutProvider>
          )}
        </section>
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
