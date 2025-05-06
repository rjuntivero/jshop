import { memo } from 'react';
import CartIcon from '../icons/CartIcon';
import Button from './Button';
import Link from 'next/link';
import MenuIcon from '../icons/MenuIcon';
import { Product } from '@/types/Product';
import { addToCart } from '@/features/cartSlice';
import { useAppDispatch } from '@/state/hooks';
import Image from 'next/image';

interface T {
  product?: Product;
  productName?: string;
  productType?: string;
  productPrice?: number;
  imageURL?: string;
}

const ProductCard: React.FC<T> = ({ product, productName, productType, productPrice, imageURL }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="motion-preset-blur-down z-1 flex h-auto grow flex-col rounded-sm bg-white shadow-md duration-400">
      <div className="p-1 md:p-3">
        <div className="relative col-span-3 h-[clamp(50px,20vh,252px)] w-full pb-1 sm:h-[clamp(50px,15vh,252px)] md:h-[clamp(50px,25vh,252px)] lg:h-[clamp(50px,40vh,352px)]">
          <Image
            className="rounded-lg object-contain object-center transition-all duration-700 group-hover:scale-102 sm:h-[clamp(50px,15vh,252px)] md:h-[clamp(50px,25vh,252px)] lg:h-[clamp(50px,40vh,352px)]"
            src={imageURL!}
            alt="PRODUCT IMAGE"
            placeholder="empty"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <div className="col-span-3 col-start-1 row-start-2 flex flex-col">
          <h1 className="font-sub-header text-primary-light dark:text-secondary-dark ml-3 truncate pt-3 text-xl md:col-span-3 md:text-xl">{productName}</h1>
          <h2 className="motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur text-primary-light/50 col-span-3 col-start-1 row-start-3 ml-3 w-30 text-[0.90rem] md:col-span-1 md:text-sm">
            {productType}
          </h2>
        </div>

        <h2 className="motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-3 col-start-1 row-start-4 ml-3 w-30 pt-1 text-[1.2rem] font-medium text-black antialiased md:col-span-1 md:text-[1.8rem]">
          {'$' + productPrice?.toFixed(2)}
        </h2>

        {/* ACTION BUTTONS */}
        <div className="mt-4 flex justify-center gap-3 border-t py-2">
          <Button className="bg-primary-light flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:brightness-85" onClick={() => dispatch(addToCart(product as Product))}>
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
  );
};

export default memo(ProductCard);
