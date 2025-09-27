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

export default function ShoppingCart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((total, item) => total + item.count, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Navbar />

      {/* Checkout Items */}
      <main className=" text-primary-light grid-rows-[1fr, auto] md:p-6 grid min-h-screen grid-cols-1 md:grid-cols-[1.5fr,1fr] md:grid-rows-[1fr] ">
        <article className="def-margin col-span-1 col-start-1 overflow-y-auto rounded-sm bg-secondary-dark p-8 shadow-md">
          <h1 className="font-sub-header font-bold text-[clamp(1rem,2vw,2rem)]">My Cart</h1>
          <div className="flex justify-between items-center w-full  mb-4 ">
            <Button onClick={handleClearCart}>
              {cartItems.length > 0 && (
                <>
                  <h2 className="text-secondary-light  text-sm md:text-xl lg:text-2xl">
                    Remove all items
                  </h2>
                </>
              )}
            </Button>
            {cartItems.length > 0 && (
              <Link href="/checkout" className="flex items-center gap-2 ">
                <h2 className="text-secondary-light  text-sm md:text-xl lg:text-2xl">Checkout</h2>
                <CartIcon width={45} height={40} color="#D9B68C" />
              </Link>
            )}
          </div>

          <div className="relative rounded-md bg-white p-6 mb-4">
            {cartItems.length > 0 ? (
              cartItems?.map((item) => (
                <CheckoutItem
                  key={String(item.id)}
                  product={item}
                  productName={item.title}
                  productPrice={item.price}
                  productType={item.category}
                  imageURL={item.thumbnail}
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
      </main>
      <div className="bg-primary-light mb-1 w-full pt-1"></div>
      <Footer />
    </>
  );
}
