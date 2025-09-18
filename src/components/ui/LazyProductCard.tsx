// components/ui/LazyProductCard.tsx
'use client';
import { useInView } from 'react-intersection-observer';
import { lazy, Suspense } from 'react';
import type { Product } from '@/types/Product';

const ProductCard = lazy(() => import('./ProductCard'));

export default function LazyProductCard({ product }: { product: Product }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="min-h-[360px]">
      {inView ? (
        <Suspense fallback={<div className="rounded-md bg-secondary-dark dark:bg-neutral-800 animate-pulse h-full w-full" />}>
          <ProductCard product={product} productName={product.title} productType={product.category} productPrice={product.price} imageURL={product.image} />
        </Suspense>
      ) : (
        // placeholder not in vew
        <div className="rounded-md bg-secondary-dark dark:bg-neutral-800 animate-pulse h-full w-full" />
      )}
    </div>
  );
}
