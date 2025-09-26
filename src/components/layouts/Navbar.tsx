'use client';
import React, { useCallback } from 'react';
import { memo } from 'react';
import Button from '../ui/Button';
import MenuIcon from '../icons/MenuIcon';
import Directory from './Directory';
import CartIcon from '../icons/CartIcon';
import { useDispatch } from 'react-redux';
import { toggleCart, toggleDirectory } from '@/features/cartSlice';
import { useAppSelector } from '@/state/hooks';
import Link from 'next/link';
interface NavbarProps {
  homePage?: boolean;
  productsPage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ homePage = false, productsPage = false }) => {
  const dispatch = useDispatch();

  const handleDirectoryToggle = useCallback(() => {
    dispatch(toggleDirectory());
  }, [dispatch]);

  const handleCartToggle = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen);

  return (
    <nav
      className={` flex items-center justify-between transition-all px-8 py-4 ${
        !homePage && 'border-b-1'
      }`}>
      <div className="left flex items-center gap-6 ">
        <Button
          onClick={handleDirectoryToggle}
          className="dark:bg-primary-dark navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2">
          <MenuIcon color="#442727" />
        </Button>
        <Directory className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`} />
      </div>
      {!homePage && (
        <h1 className="logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest">
          JSHOP
        </h1>
      )}
      <div className="right flex items-center gap-6">
        {productsPage && (
          <Button
            onClick={handleCartToggle}
            className="d flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors">
            <CartIcon width={44} height={40} color="#442727" />
          </Button>
        )}
        {homePage && (
          <Link href="/my-cart">
            <Button
              onClick={handleCartToggle}
              className="d flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors">
              <CartIcon width={44} height={40} color="#442727" />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default memo(Navbar);
