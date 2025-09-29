'use client';
import { memo, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/Product';
import Image from 'next/image';

interface T {
  product?: Product;
}

const ProductPreview: React.FC<T> = ({ product }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="outline-1 outline-primary-dark/25 aspect-square motion-preset-blur-down z-1 flex h-auto grow flex-col bg-secondary-dark shadow-md duration-400">
      <div className="">
        <Link href={`/products/${product?.id}`}>
          <div
            className={`relative w-full aspect-square mx-auto overflow-hidden  transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}>
            <Image
              sizes="(max-width: 768px) 100vw, 400px"
              src={product!.thumbnail!}
              alt={product?.title ?? 'Product Image'}
              fill
              className="object-contain object-center hover:brightness-90 transition-all duration-300 ease-in-out hover:saturate-90 hover:scale-103 hover:-translate-y-1"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </Link>

        <div className="flex flex-col p-1 md:p-3 bg-white  border-t-1 border-t-primary-light/20">
          <h1 className="font-sub-header text-primary-light dark:text-secondary-dark truncate  text-sm md:text-[1rem]">
            {product?.title}
          </h1>
          <div className="flex items-center  gap-2">
            {(product?.availabilityStatus === 'Low Stock' && (
              <p className="text-[0.7rem] md:text-[0.8rem] font-semibold">
                <span className="text-red-600">Only {product.stock} left</span>
              </p>
            )) ||
              ''}
            <h2 className="pt-1 text-[0.8rem] font-semibold text-primary-light antialiased md:text-[1rem] flex gap-1 items-start">
              <span className="text-[0.4rem] md:text-[0.7rem] ">$</span>
              {product?.price?.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductPreview);
