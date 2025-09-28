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
              className="object-contain object-center hover:brightness-90 transition-all duration-300 ease-in-out hover:saturate-90"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </Link>

        <div className="flex flex-col p-1 md:p-3 bg-white  border-t-1 border-t-primary-light/20">
          <h1 className="font-sub-header text-primary-light dark:text-secondary-dark truncate  text-xl md:text-xl">
            {product?.title}
          </h1>
          <h2 className="pt-1 text-[1.2rem] font-semibold text-primary-light antialiased md:text-[2rem] flex gap-1 items-start">
            <span className="text-[0.8rem] md:text-[1.55rem] ">$</span>
            {product?.price?.toFixed(2)}
          </h2>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductPreview);
