'use client';

import { useAppSelector } from '@/state/hooks';
import { useDispatch } from 'react-redux';
import { toggleDirectory } from '@/features/cartSlice';
import Button from '@/components/ui/Button';
import MenuIcon from '@/components/icons/MenuIcon';
import Directory from '@/components/layouts/Directory';
import CartIcon from '../icons/CartIcon';
import Link from 'next/link';

export default function DirectoryToggle() {
  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen);
  const dispatch = useDispatch();

  const handleDirectoryToggle = () => {
    dispatch(toggleDirectory());
  };

  return (
    <>
      <div className="left flex items-center gap-6">
        <Button
          onClick={handleDirectoryToggle}
          className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2"
        >
          <MenuIcon color="#442727" />
        </Button>
        <Directory className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`} />
      </div>
      <div className="right flex items-center gap-6">
        <Link
          href="/my-cart"
          className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
        >
          <CartIcon width={44} height={40} color="#442727" />
        </Link>
      </div>
    </>
  );
}
