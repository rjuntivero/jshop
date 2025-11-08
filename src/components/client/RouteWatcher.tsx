'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/state/hooks';
import { closeCart } from '@/features/uiSlice';

// Watches route changes and closes UI overlays (cart) on routes that don't
// render an inline cart. Keeps cart open on product listing and product pages.
export default function RouteWatcher() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pathname) return;

    const isProductRoute = pathname === '/products' || pathname.startsWith('/products/');

    if (!isProductRoute) {
      dispatch(closeCart());
    }
  }, [pathname, dispatch]);

  return null;
}
