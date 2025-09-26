'use client';
import Link from 'next/link';
import MenuIcon from '@/components/icons/MenuIcon';
import Directory from '@/components/layouts/Directory';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import Button from '@/components/ui/Button';
import CheckoutItem from '@/components/ui/CheckoutItem';
import CartIcon from '@/components/icons/CartIcon';
import { useAppSelector } from '@/state/hooks';
import { useDispatch } from 'react-redux';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { clearCart, toggleDirectory } from '@/features/cartSlice';
import convertToSubcurrency from '../../../lib/convertToSubcurrency';

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector((state) => state.cart.totalPrice);
  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((total, item) => total + item.count, 0);

  const handleDirectoryToggle = () => {
    dispatch(toggleDirectory());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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
      <Navbar cartPage={true} />
      <hr className="bg-primary-light " />

      {/* Checkout Items */}
      <main className=" text-primary-light grid-rows-[1fr, auto] md:p-6 grid min-h-screen grid-cols-1 md:grid-cols-[1.5fr,1fr] md:grid-rows-[1fr] ">
        <article className="def-margin col-span-1 col-start-1 overflow-y-auto rounded-sm bg-secondary-dark p-8 shadow-md">
          <h1 className="font-sub-header font-bold text-[clamp(1rem,2vw,2rem)]">My Cart</h1>
          <Button onClick={handleClearCart}>
            {cartItems.length > 0 && (
              <h2 className="text-secondary-light  mb-4 text-sm md:text-xl lg:text-2xl">
                Remove all items
              </h2>
            )}
          </Button>
          <div className="relative rounded-md">
            {cartItems.length > 0 ? (
              cartItems?.map((item) => (
                <CheckoutItem
                  key={String(item.id)}
                  product={item}
                  productName={item.title}
                  productPrice={item.price}
                  productType={item.category}
                  imageURL={item.image}
                  totalPrice={item.totalPrice}
                  count={item.count}
                />
              ))
            ) : (
              <div className="text-[clamp(0.2rem, 1vw, 1.5rem)]">
                <h1 className="font-bold text-black">Your JSHOP cart is empty...</h1>
                <Link href="/products" className="text-black">
                  Your shopping cart lives to serve --- Go out there and fill it with items!!
                </Link>
              </div>
            )}
          </div>
          <h1 className="text-[clamp(0.2rem,2vw,1.3rem)] text-end">
            Subtotal: {`(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}{' '}
            <strong>${cartTotal.toFixed(2)}</strong>
          </h1>
        </article>
        <div className=" p-8 md:col-start-2 md:row-start-1">
          <div className="flex  flex-col gap-4 text-secondary-light outline-secondary-light/50 rounded-sm bg-secondary-dark p-8 font-bold outline-1 ">
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
          </div>
        </div>
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
