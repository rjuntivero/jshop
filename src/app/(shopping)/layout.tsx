'use client';
import React from 'react';
import NavbarShopping from '@/components/layouts/NavbarShopping';
import CartSidebar from '@/components/layouts/CartSidebar';
import { useAppSelector } from '@/state/hooks';
import { useDispatch } from 'react-redux';
import { toggleCart } from '@/features/cartSlice';

export default function ShoppingLayout({ children }: { children: React.ReactNode }) {
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleCart());

  return (
    <>
      <header className="sticky top-0 z-50 bg-background-light">
        <NavbarShopping />
      </header>

      <CartSidebar
        onClose={handleClose}
        className={`bg-background-light fixed top-0 right-0 z-99999 flex h-dvh w-93 md:w-106 flex-col outline-1 transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      />

      <main>{children}</main>
    </>
  );
}
