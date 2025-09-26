'use client';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import Button from '@/components/ui/Button';
import { useAppSelector } from '@/state/hooks';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import convertToSubcurrency from '../../../lib/convertToSubcurrency';

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  // const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubcurrency(cartTotal) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cartTotal]);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
        return_url: `http://www.localhost:3000/payment-success?amount${cartTotal}`,
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

      {/* Checkout Items */}
      <main className=" text-primary-light min-h-screen">
        <div className=" p-8 ">
          <article className=" flex flex-col grow gap-4 text-secondary-light outline-secondary-light/50 rounded-sm bg-secondary-dark p-8 font-bold outline-1 ">
            <div className="flex justify-between">
              <h1 className="text-primary-light">Total: </h1>
              <h1 className="text-primary-light justify-self-end">{'$' + cartTotal.toFixed(2)}</h1>
            </div>

            <hr className="w-full" />
            <h1>Choose Payment Method:</h1>
            {/* {!clientSecret && loading && (
              <div className="flex h-[100px] items-center justify-center">
                <LoadWheel />
              </div>
            )} */}
            <form onSubmit={handleCheckout} className="flex flex-col gap-6">
              {clientSecret && <PaymentElement />} {errorMessage && <div>{errorMessage}</div>}
              <Button className="hover:scale-102 transition-all duration-150 outline-1 outline-secondary-light hover:bg-white hover:text-secondary-light text-secondary-dark p-4 w-full flex justify-center items-center bg-secondary-light rounded-md">
                {!loading ? `Pay $${cartTotal}` : 'Processing...'}
              </Button>
            </form>
          </article>
        </div>
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
