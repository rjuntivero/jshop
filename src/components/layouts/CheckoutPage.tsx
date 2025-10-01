'use client';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import Button from '@/components/ui/Button';
import { useAppSelector } from '@/state/hooks';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import convertToSubcurrency from '../../../lib/convertToSubcurrency';
import CheckoutItem from '@/components/ui/CheckoutItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebaseConfig';
import useAuthCart from '@/hooks/useAuthCart';

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const [user] = useAuthState(auth);

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  // auth users
  const [authCart] = useAuthCart(user ?? null);
  const authCartTotal = user && authCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // guest users
  const guestCart = useAppSelector((state) => state.cart.items);
  const guestCartTotal = useAppSelector((state) => state.cart.totalPrice);

  const cart = user ? authCart : guestCart;
  const cartTotal = user ? authCartTotal : guestCartTotal;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubcurrency(cartTotal as number) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cartTotal]);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem('cart', JSON.stringify(guestCart));

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${cartTotal}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className=" text-primary-light min-h-screen flex p-6 gap-4">
        {/* Item Wrapper */}
        <article className="flex-2 flex flex-col gap-2 rounded-sm bg-secondary-dark p-4 shadow-md ">
          <header className="flex justify-between items-center">
            <h1 className="font-sub-header font-bold text-[clamp(1rem,2vw,2rem)]">Cart Items:</h1>
            <h1 className="">
              <div className="flex gap-2 text-[clamp(0.2rem,2vw,1.3rem)] text-end  justify-end items-end">
                <p>
                  Subtotal: <strong>${cartTotal?.toFixed(2) ?? 0}</strong>
                </p>
                {` (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}{' '}
              </div>
            </h1>
          </header>
          {/* Cart Items */}
          <div className="relative flex flex-col ">
            {cart?.map((item) => (
              <CheckoutItem key={String(item.id)} product={item} />
            ))}
          </div>
        </article>
        <section className=" flex-1 sticky top-3 self-start">
          <article className=" flex flex-col grow gap-4 text-secondary-light outline-secondary-light/50 rounded-sm bg-secondary-dark p-8 font-bold outline-1 ">
            <div className="flex justify-between">
              <h1 className="text-primary-light">Total: </h1>
              <h1 className="text-primary-light justify-self-end">
                {'$' + (cartTotal?.toFixed(2) ?? 0)}
              </h1>
            </div>

            <hr className="w-full" />
            <h1>Choose Payment Method:</h1>
            {/* {!clientSecret && loading && (
              <div className="flex h-[100px] items-center justify-center">
                <LoadWheel />
              </div>
            )} */}
            <form
              onSubmit={handleCheckout}
              className="flex flex-col gap-6 overflow-y-auto overflow-x-hidden max-h-[750px] py-4 pr-4">
              {clientSecret && <PaymentElement />} {errorMessage && <div>{errorMessage}</div>}
              <Button className="hover:scale-102 transition-all duration-150 outline-1 outline-secondary-light hover:bg-white hover:text-secondary-light text-secondary-dark p-4 w-full flex justify-center items-center bg-secondary-light rounded-md">
                {!loading ? `Pay $${cartTotal}` : 'Processing...'}
              </Button>
            </form>
          </article>
        </section>
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
