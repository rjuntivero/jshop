'use client';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SummaryItem from '@/components/ui/SummaryItem';
import { Product } from '@/types/Product';
import { fetchLatestReceipt, fetchProductsData } from '../lib/fetchLatestReceipt';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const paymentIntent = searchParams.get('payment_intent');
  const clientSecret = searchParams.get('payment_intent_client_secret');
  const [cartItems, setCartItems] = useState<Product[] | []>([]);
  const redirectStatus = searchParams.get('redirect_status');
  const [orderNumber, setOrderNumber] = useState('');

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      if (!user) return;

      const { items, orderNumber } = await fetchLatestReceipt(user.uid);
      const products = await fetchProductsData(items);
      setCartItems(products);
      setOrderNumber(orderNumber);
    };

    fetchPurchasedItems();
  }, [user]);

  console.log({ amount, paymentIntent, clientSecret, redirectStatus });
  return (
    <>
      <Navbar />

      {/* Checkout Items */}
      <main className=" text-primary-light md:p-6 min-h-screen">
        <article className="  p-12  flex flex-col items-center gap-6">
          <div className=" max-w-[55ch] flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 p-4 bg-primary-light rounded-full text-secondary-light flex items-center justify-center text-3xl ">
              ✔
            </div>
            <h1 className="text-4xl  font-semibold pt-3">Thank You For Your Purchase</h1>
            <p className=" text-center text-lg">Your order number is #{orderNumber}</p>
          </div>

          <div className="flex flex-col bg-secondary-dark p-8 max-w-[1200px] min-w-[900px] outline-1 rounded-sm outline-secondary-light/40">
            <h1 className="text-2xl font-bold">Order Summary</h1>
            <div className=" relative  flex flex-col overflow-y-auto max-h-[400px] mb-4">
              {cartItems!.map((item) => (
                <SummaryItem
                  key={String(item.id)}
                  product={item}
                  totalPrice={item.totalPrice}
                  quantity={item.quantity}
                />
              ))}
            </div>
            <hr />
            <div className=" pt-4 flex justify-between gap-2 text-[clamp(0.2rem,2vw,1.3rem)] text-end   items-end">
              <h2>Total</h2>
              <div className="justify-self-end flex gap-2">
                <p>
                  <strong>{`$ ${amount} `} </strong>
                </p>
                <p>{` (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`} </p>
              </div>
            </div>
          </div>
          <Link
            href={'/'}
            className="py-3 px-4 bg-primary-light text-secondary-light font-semibold rounded-full">
            Back to Home
          </Link>
        </article>
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
