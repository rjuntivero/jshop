'use client';
import React, { useCallback } from 'react';
import { memo } from 'react';
import Button from '../ui/Button';
import MenuIcon from '../icons/MenuIcon';
import Directory from './Directory';
import CartIcon from '../icons/CartIcon';
import { useAppDispatch } from '@/state/hooks';
import { toggleCart, toggleDirectory } from '@/features/uiSlice';
import { useAppSelector } from '@/state/hooks';
import Link from 'next/link';
import UserIcon from '../icons/UserIcon';
import { useAuth } from '@/hooks/useAuth';
import SearchIcon from '../icons/SearchIcon';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebaseConfig';
import Image from 'next/image';

interface NavbarProps {
  homePage?: boolean;
  productsPage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ homePage = false, productsPage = false }) => {
  const dispatch = useAppDispatch();

  const handleDirectoryToggle = useCallback(() => {
    dispatch(toggleDirectory());
  }, [dispatch]);

  const handleCartToggle = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  const isDirectoryOpen = useAppSelector((state) => state.ui.isDirectoryOpen);

  const { logout } = useAuth();
  const [user] = useAuthState(auth);

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
        <Link href={'/products'} className="flex cursor-pointer">
          <Image src="shoppingbag.svg" width={40} height={40} alt="shopping bag icon" />
        </Link>
      </div>
      {!homePage && (
        <h1 className="logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest">
          JSHOP
        </h1>
      )}
      <div className="right flex items-center gap-4 ">
        <div className=" text-sm rounded-full bg-secondary-dark flex justify-between gap-2 items-center">
          <div className="flex items-center justify-center hover:bg-secondary-light/50 rounded-full p-2 transition-colors duration-300 cursor-pointer">
            <SearchIcon width={30} height={26} />
          </div>
          <input type="text" placeholder="Search " className="text-md font-semibold max-w-30" />
        </div>
        {productsPage && (
          <Button
            onClick={handleCartToggle}
            className="d flex h-[50px] w-[50px] items-center justify-center  transition-colors">
            <CartIcon width={44} height={40} color="#442727" />
          </Button>
        )}
        {homePage && (
          <Link href="/my-cart">
            <Button
              onClick={handleCartToggle}
              className=" flex h-[50px] w-[50px] items-center justify-center  transition-colors ">
              <CartIcon width={44} height={40} color="#442727" />
            </Button>
          </Link>
        )}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button
                className="hover:bg-secondary-light p-2 rounded-full transition-all duration-300"
                onClick={logout}>
                Sign Out
              </Button>
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full transition-colors">
                <UserIcon width={44} height={40} color="#442727" />
              </div>
            </>
          ) : (
            <Link href="/login">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
