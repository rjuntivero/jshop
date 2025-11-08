'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closeCart } from '@/features/cartSlice';

// Watches route changes and closes the cart sidebar on routes that don't
// render an inline cart. Keeps cart open on product listing and product pages.
export default function RouteWatcher() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pathname) return;

    // Allow cart to stay open for product routes (e.g. /products and /products/[id])
    const isProductRoute = pathname === '/products' || pathname.startsWith('/products/');

    if (!isProductRoute) {
      dispatch(closeCart());
    }
  }, [pathname, dispatch]);

  return null;
}
