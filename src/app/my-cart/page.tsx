'use client';
import Link from 'next/link';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import Button from '@/components/ui/Button';
import CheckoutItem from '@/components/ui/CheckoutItem';
import { useAppSelector } from '@/state/hooks';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/features/cartSlice';
import CartIcon from '@/components/icons/CartIcon';
import useAuthCart from '@/hooks/useAuthCart';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

export default function ShoppingCart() {
  const dispatch = useDispatch();

  const [user] = useAuthState(auth);

  // auth users
  const [authCart] = useAuthCart(user ?? null);
  const cartTotal = user && authCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // guest users
  const guestCart = useAppSelector((state) => state.cart.items);
  const guestCartTotal = useAppSelector((state) => state.cart.totalPrice);

  const cart = user ? authCart : guestCart;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Navbar />

      {/* Checkout Items */}
      <main className=" text-primary-light min-h-screen md:p-6 flex ">
        <article className="flex-1 p-4 col-span-1 col-start-1  rounded-sm bg-secondary-dark  shadow-md flex flex-col gap-2">
          <header className="">
            <div className="flex items-center justify-between">
              <h1 className="font-sub-header font-bold text-[clamp(1rem,2vw,2rem)]">Cart Items:</h1>
              <div className="flex gap-2 text-[clamp(0.2rem,2vw,1.3rem)] text-end  justify-end items-end">
                <p>
                  Subtotal:{' '}
                  <strong>${user ? cartTotal?.toFixed(2) ?? 0 : guestCartTotal.toFixed(2)}</strong>
                </p>
                {` (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}{' '}
              </div>
            </div>
            {/* actions */}
            <div className="flex justify-between items-center w-full ">
              <Button onClick={handleClearCart}>
                {cart.length > 0 && (
                  <>
                    <h2 className="text-secondary-light  text-sm md:text-xl lg:text-lg">
                      Remove all items
                    </h2>
                  </>
                )}
              </Button>
              {cart.length > 0 && (
                <Link href="/checkout" className="flex items-center gap-2 ">
                  <h2 className="text-secondary-light  text-sm md:text-xl lg:text-lg">Checkout</h2>
                  <CartIcon width={45} height={40} color="#D9B68C" />
                </Link>
              )}
            </div>
          </header>
          {/* Cart Items */}
          <div className="relative  flex flex-col ">
            {cart.length > 0 ? (
              cart?.map((item) => <CheckoutItem key={String(item.id)} product={item} />)
            ) : (
              <div className="text-[clamp(0.2rem, 1vw, 1.5rem)]">
                <h1 className="font-bold text-black">Your JSHOP cart is empty...</h1>
                <Link href="/products" className="text-black">
                  Your shopping cart lives to serve --- Go out there and fill it with items!!
                </Link>
              </div>
            )}
          </div>
        </article>
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
