import { memo } from 'react';
import Button from './Button';
import { Product } from '../../types/Product';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebaseConfig';
import { addToCart, clearItem, removeFromCart } from '@/app/lib/authCart';
import { User } from 'firebase/auth';
import { addToGuestCart, clearGuestItem, removeFromGuestCart } from '@/app/lib/guestCart';
import { CartItem as CartItemType } from '@/hooks/useCart';

interface T {
  product?: Product;
  quantity?: number;
  totalPrice: number;
  updateGuestCart: (items: CartItemType[]) => void;
}

const CartItem: React.FC<T> = ({ product, totalPrice, quantity, updateGuestCart }) => {
  const [user] = useAuthState(auth);

  return (
    <div className=" motion-preset-blur-down  border-b-1 border-primary-light flex h-auto w-full self-center duration-400 p-8 ">
      <article className="grow flex gap-6">
        <div className="p-4 bg-white shadow-sm outline-1 outline-primary-light/10 flex items-center">
          <Image
            className=" max-h-[150px] aspect-square max-w-[100px] rounded-sm object-contain object-center "
            src={product?.thumbnail ?? ''}
            alt="Product Image"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col grow">
          <h1 className="text-lg font-main mb-2 w-full text-ellipsis line-clamp-1">
            {product?.title}
          </h1>
          <h2 className="font-main pb-2 text-[1.2rem] font-medium">
            {'$ ' + totalPrice?.toFixed(2)}
          </h2>
          <div className="flex gap-4 items-center justify-between">
            <div className="outline-1 outline-secondary-light/60 flex items-center justify-between bg-white text-sm grow">
              <Button
                onClick={
                  user
                    ? () => removeFromCart(product as Product, user as User)
                    : () => removeFromGuestCart(product as Product, updateGuestCart)
                }
                className="hover:bg-secondary-light/30 self-center p-4 h-full transition duration-400">
                -
              </Button>
              <h1>{quantity}</h1>
              <Button
                onClick={
                  user
                    ? () => addToCart(product as Product, user as User)
                    : () => addToGuestCart(product as Product, updateGuestCart)
                }
                className="hover:bg-secondary-light/30 self-center h-full p-4 transition duration-400">
                +
              </Button>
            </div>
            <Button
              onClick={
                user
                  ? () => clearItem(product as Product, user as User)
                  : () => clearGuestItem(product as Product, updateGuestCart)
              }>
              <Image src="/trash.svg" alt="trash icon" width={25} height={25} />
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default memo(CartItem);
