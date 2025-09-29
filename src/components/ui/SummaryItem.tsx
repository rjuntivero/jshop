import Button from './Button';
import { Product } from '../../types/Product';
import Link from 'next/link';
import Image from 'next/image';

interface T {
  product?: Product;
  productName?: string;
  productPrice?: number;
  productType?: string;
  totalPrice?: number;
  imageURL?: string;
  count?: number;
}

export default function SummaryItem({ product, productName, totalPrice, imageURL, count }: T) {
  return (
    <section className="">
      <article className="motion-preset-blur-down flex flex-col gap-8 duration-400 sm:flex-row  py-5 pr-6 ">
        <Link
          href={`/products/${product!.id}`}
          className="aspect-square w-full md:w-[clamp(100px,20vw,180px)] h-[clamp(100px,20vw,180px)] relative bg-white outline-1 outline-primary-light/10 shadow-sm">
          <Image
            className="rounded-sm object-contain transition-all duration-400 hover:-translate-y-1 hover:scale-102 p-4"
            src={imageURL!}
            alt="Product Image"
            fill
          />
        </Link>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h1 className="font-main mb-2 text-[clamp(1rem,2vw,1.3rem)]">{productName}</h1>

            <h2 className="font-main pb-2 text-[clamp(1rem,3vw,1.3rem)] font-semibold">
              {'$ ' + totalPrice?.toFixed(2)}
            </h2>
          </div>
          <div className="flex flex-col md:items-center md:flex-row">
            <div className="flex px-1 text-center gap-2">
              <p className="">Qt: </p>
              <p>{count}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
