import { memo, useState } from 'react';
import CartIcon from '../icons/CartIcon';
import Button from './Button';
import Link from 'next/link';
import MenuIcon from '../icons/MenuIcon';
import { Product } from '@/types/Product';
import { addToCart } from '@/features/cartSlice';
import { useAppDispatch } from '@/state/hooks';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useItemCount } from '@/hooks/useItemCount';
import ItemCounter from './ItemCounter';

interface T {
  product?: Product;
  productName?: string;
  productType?: string;
  productPrice?: number;
  imageURL?: string;
}

const ProductCard: React.FC<T> = ({ product, productName, productType, productPrice, imageURL }) => {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);
  const { itemCount, updateItemCount } = useItemCount();

  const handleAddToCart = (product: Product) => {
    const payload: Product = {
      ...product,
      count: itemCount,
    };
    dispatch(addToCart(payload));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <article className="outline-1 outline-primary-dark/20 aspect-square motion-preset-blur-down z-1 flex h-auto grow flex-col rounded-sm bg-secondary-dark shadow-md duration-400">
      <div className=" group relative">
        {/* Image */}
        <div className="relative w-full  ">
          <div className="max-w-[400px] aspect-square mx-auto overflow-hidden">
            <Image
              sizes="(max-width: 768px) 100vw, 400px"
              src={imageURL!}
              alt="PRODUCT IMAGE"
              fill
              className={`p-2 md:p-4 lg:p-6 cursor-pointer object-contain object-center transition-all duration-500 group-hover:scale-103 group-hover:-translate-y-1 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
            />
            {/* Hover Overlay (covers only the top part of the card, never stats) */}
            <div className="absolute top-0 left-0 right-0 h-full duration-200 mix-blend-multiply  bg-secondary-light/60 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
            {/* View Details Button */}
            <Link href={`/products/${product!.id}`}>
              <Button className="absolute top-[40%] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-110 hover:text-secondary-light border-white hover:bg-white transition-all duration-200 font-bold text-white border-2 p-4">
                View Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats + Price (always visible, outside overlay) */}
        <div className=" md:p-3 p-2">
          <div>
            <h1 className="font-sub-header text-primary-light dark:text-secondary-dark truncate text-xl md:text-xl">{productName}</h1>
            <h2 className="text-secondary-light text-[0.90rem] md:text-lg font-medium">{productType}</h2>
            <h2 className="pt-1 text-[1.2rem] font-bold text-primary-light antialiased md:text-[2rem]">{'$ ' + productPrice?.toFixed(2)}</h2>
          </div>
          {/* Action Buttons */}
          <div className="mt-3 flex justify-between gap-3 border-t pt-2  transition-opacity duration-300">
            <ItemCounter itemCount={itemCount} updateItemCount={updateItemCount} />
            <div className="flex gap-3 items-center">
              <Button className="hover:bg-primary-light/30 rounded-md border-primary-light border-2 flex h-10 w-10 items-center justify-center   transition-all duration-300 hover:brightness-85" onClick={() => handleAddToCart(product as Product)}>
                <Image width={25} height={25} src="/shoppingbag.svg" alt="Shopping Bag Icon" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCard);
