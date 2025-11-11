'use client';
import Link from 'next/link';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import Button from '@/components/ui/Button';
import { useAppSelector } from '@/state/hooks';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/features/cartSlice';
import useAuthCart from '@/hooks/useAuthCart';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import CheckoutItemList from '@/components/ui/CheckoutItemList';
import Subtotal from '@/components/ui/Subtotal';

export default function ShoppingCart() {
  const dispatch = useDispatch();

  const [user] = useAuthState(auth);

  // auth users
  const [authCart] = useAuthCart(user ?? null);
  const authCartTotal = user && authCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // guest users
  const guestCart = useAppSelector((state) => state.cart.items);
  const guestCartTotal = useAppSelector((state) => state.cart.totalPrice);

  const cart = user ? authCart : guestCart;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = user ? authCartTotal : guestCartTotal;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Navbar />

      {/* Checkout Items */}
      <main className=" text-primary-light min-h-screen md:p-6 flex gap-4">
        <article className="flex-2 p-4 col-span-1 col-start-1  rounded-sm bg-secondary-dark  shadow-md flex flex-col gap-2">
          <header className="">
            <div className="flex items-center justify-between">
              <h1 className="font-sub-header font-bold text-[clamp(1rem,2vw,2rem)]">Cart Items:</h1>
            </div>
            {/* actions */}
            <div className="flex justify-between items-center w-full ">
              <Button onClick={handleClearCart}>
                {cart.length > 0 && (
                  <>
                    <h2 className="text-secondary-light  text-sm md:text-xl lg:text-lg font-semibold">
                      Remove all items
                    </h2>
                  </>
                )}
              </Button>
            </div>
          </header>
          {/* Cart Items */}
          <CheckoutItemList user={user} isCart={true} />
          <Subtotal totalItems={totalItems} cartTotal={cartTotal ?? 0} />
        </article>
        <section className="  sticky top-3 self-start">
          <article className=" flex flex-col grow gap-4 text-secondary-light outline-secondary-light/50 rounded-sm bg-secondary-dark p-8 font-bold outline-1">
            <Subtotal totalItems={totalItems} cartTotal={cartTotal ?? 0} />
            {cart.length > 0 && user ? (
              <Link href="/checkout" className="btn w-full font-semibold">
                Proceed to Checkout
              </Link>
            ) : (
              <Button className="p-4 bg-secondary-light text-white font-semibold">
                {user === null ? 'Login to checkout' : 'Loading cart...'}
              </Button>
            )}
          </article>
        </section>
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
