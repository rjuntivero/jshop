import { memo } from 'react';
import Button from './Button';
import { Product } from '../../types/Product';
import { addToCart, removeFromCart } from '../../features/cartSlice';
import { useDispatch } from 'react-redux';
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

const CartItem: React.FC<T> = ({ product, productName, totalPrice, imageURL, count }) => {
  const dispatch = useDispatch();
  return (
    <div className=" motion-preset-blur-down border-b-1 border-primary-light flex h-auto w-full self-center duration-400 p-8">
      <article className="grow flex gap-6">
        <div className="p-4 bg-white shadow-sm outline-1 outline-primary-light/10 flex items-center">
          <Image className=" max-h-[150px] aspect-square max-w-[100px] rounded-sm object-contain object-top " src={imageURL ?? ''} alt="Product Image" width={300} height={300} />
        </div>
        <div className="flex flex-col grow">
          <h1 className="text-lg font-main mb-2 w-full text-ellipsis line-clamp-1">{productName}</h1>
          <h2 className="font-main pb-2 text-[1.5rem] font-semibold">{'$' + totalPrice?.toFixed(2)}</h2>
          <div className="flex items-center justify-between rounded-sm bg-secondary-light/20 text-sm grow">
            <Button onClick={() => dispatch(removeFromCart(product?.id as number))} className="hover:bg-primary-light/20 self-center p-4 h-full transition duration-400">
              -
            </Button>
            <h1>{count}</h1>
            <Button onClick={() => dispatch(addToCart(product as Product))} className="hover:bg-primary-light/20 self-center h-full p-4 transition duration-400">
              +
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default memo(CartItem);
