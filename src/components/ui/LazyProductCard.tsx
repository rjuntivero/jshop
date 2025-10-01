// components/ui/LazyProductCard.tsx
'use client';
import { useInView } from 'react-intersection-observer';
import { lazy, Suspense } from 'react';
import type { Product } from '@/types/Product';
import { CartItem } from '@/hooks/useCart';
import { User } from 'firebase/auth';

const ProductCard = lazy(() => import('./ProductCard'));

interface Props {
  updateGuestCart: (items: CartItem[]) => void;
  user?: User | null;
  product: Product;
}

export default function LazyProductCard({ product, user, updateGuestCart }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="min-h-[360px]">
      {inView ? (
        <Suspense
          fallback={
            <div className="rounded-md bg-secondary-dark dark:bg-neutral-800 animate-pulse h-full w-full" />
          }>
          <ProductCard
            product={product}
            imageURL={product.thumbnail}
            updateGuestCart={updateGuestCart}
            user={user}
          />
        </Suspense>
      ) : (
        // placeholder not in vew
        <div className="rounded-md bg-secondary-dark dark:bg-neutral-800 animate-pulse h-full w-full" />
      )}
    </div>
  );
}
