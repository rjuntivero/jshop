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
      <div className="p-1 md:p-3 ">
        <div className="relative w-full max-w-[400px] aspect-square mx-auto ">
          <Image
            sizes="(max-width: 768px) 100vw, 400px"
            src={imageURL!}
            alt="PRODUCT IMAGE"
            fill
            className={`rounded-lg object-contain object-center transition-all duration-700 group-hover:scale-102 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div className="col-span-3 col-start-1 row-start-2 flex flex-col">
          <h1 className="font-sub-header text-primary-light dark:text-secondary-dark ml-3 truncate pt-3 text-xl md:col-span-3 md:text-xl">{productName}</h1>
          <h2 className="motion-scale-in-[0.1] motion-translate-x-in-[-14%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur text-primary-light/50 col-span-3 col-start-1 row-start-3 ml-3 w-full text-[0.90rem] md:col-span-1 md:text-lg">
            {productType}
          </h2>
        </div>

        <h2 className="motion-scale-in-[0.1] motion-translate-x-in-[-14%] motion-translate-y-in-[-6%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-3 col-start-1 row-start-4 ml-3 w-full pt-1 text-[1.2rem] font-bold text-primary-light antialiased md:col-span-1 md:text-[2rem]">
          {'$ ' + productPrice?.toFixed(2)}
        </h2>

        {/* ACTION BUTTONS */}
        <div className="mt-4 flex justify-between gap-3 border-t py-2">
          <ItemCounter itemCount={itemCount} updateItemCount={updateItemCount} />
          <div className="flex gap-3 items-center">
            <Button className="bg-primary-light flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:brightness-85" onClick={() => handleAddToCart(product as Product)}>
              <CartIcon width={20} height={20} color="white" />
            </Button>
            <Link href={`/products/${product?.id}`}>
              <Button className="bg-secondary-light flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:brightness-85">
                <MenuIcon width={'20'} height={'20'} color="white" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCard);
