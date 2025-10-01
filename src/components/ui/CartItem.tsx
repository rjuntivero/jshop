import { memo } from 'react';
import Button from './Button';
import { Product } from '../../types/Product';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebaseConfig';
import { addToAuthCart, clearAuthItem, removeFromAuthCart } from '@/app/lib/authCart';
import { User } from 'firebase/auth';
import { useAppDispatch } from '@/state/hooks';
import { addToCart, clearItem, removeFromCart } from '@/features/cartSlice';

interface T {
  product?: Product;
  quantity?: number;
  totalPrice: number;
}

const CartItem: React.FC<T> = ({ product, totalPrice, quantity }) => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  // guest cart
  const handleAddToGuestCart = () => {
    dispatch(
      addToCart({
        ...(product as Product),
        quantity: 1,
      })
    );
  };

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
                    ? () => removeFromAuthCart(product as Product, user as User)
                    : () => dispatch(removeFromCart(product!.id))
                }
                className="hover:bg-secondary-light/30 self-center p-4 h-full transition duration-400">
                -
              </Button>
              <h1>{quantity}</h1>
              <Button
                onClick={
                  user
                    ? () => addToAuthCart(product as Product, user as User)
                    : () => handleAddToGuestCart()
                }
                className="hover:bg-secondary-light/30 self-center h-full p-4 transition duration-400">
                +
              </Button>
            </div>
            <Button
              onClick={
                user
                  ? () => clearAuthItem(product as Product, user as User)
                  : () => dispatch(clearItem(product!.id))
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
