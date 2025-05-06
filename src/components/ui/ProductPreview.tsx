import { memo } from 'react';
import Link from 'next/link';
import { Product } from '@/types/Product';
import Image from 'next/image';

interface T {
  product?: Product;
  productName?: string;
  productPrice?: number;
  imageURL?: string;
}

const ProductPreview: React.FC<T> = ({ product, productName, productPrice, imageURL }) => {
  return (
    <article className="aspect-square motion-preset-blur-down z-1 flex h-auto grow flex-col rounded-sm bg-white shadow-md duration-400">
      <div className="p-1 md:p-3">
        <Link href={`/products/${product?.id}`}>
          <div className="relative w-full max-w-[150px] md:max-w-[300px] aspect-square mx-auto ">
            <Image src={imageURL!} alt="PRODUCT IMAGE" fill className="rounded-lg object-contain object-center transition-all duration-700 group-hover:scale-102" />
          </div>
        </Link>

        <div className="col-span-3 col-start-1 row-start-2 flex flex-col">
          <h1 className="font-sub-header text-primary-light dark:text-secondary-dark ml-3 truncate pt-3 text-xl md:col-span-3 md:text-xl">{productName}</h1>
        </div>

        <h2 className="motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-3 col-start-1 row-start-4 ml-3 w-30 pt-1 text-[1.2rem] font-medium text-black antialiased md:col-span-1 md:text-[1.8rem]">
          {'$' + productPrice?.toFixed(2)}
        </h2>
      </div>
    </article>
  );
};

export default memo(ProductPreview);
