import { memo } from 'react';
import Button from './Button';
import { Product } from '../../types/Product';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart, clearItem, removeFromCart } from '../../features/cartSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebaseConfig';
import { addToAuthCart, clearAuthItem, removeFromAuthCart } from '@/app/lib/authCart';

import { User } from 'firebase/auth';
import CloseIcon from '../icons/CloseIcon';

interface T {
  product?: Product;
  isCart?: boolean;
}

const CheckoutItem: React.FC<T> = ({ product, isCart }) => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  // guest cart
  const handleAddToGuestCart = () => {
    dispatch(
      addToCart({
        ...(product as Product),
        quantity: 1,
      })
    );
  };
  const handleRemoveFromGuestCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const handleClearGuestItem = (id: number) => {
    dispatch(clearItem(id));
  };
  return (
    <section className="mb-8 ">
      <hr className="text-gray-400" />
      <article className="motion-preset-blur-down flex flex-col gap-8 duration-400 sm:flex-row  p-2 md:p-6 ">
        <Link
          href={`/products/${product!.id}`}
          className="aspect-square w-full md:w-[clamp(100px,20vw,200px)] h-[clamp(100px,20vw,200px)] relative bg-white outline-1 outline-primary-light/10 shadow-sm">
          <Image
            className="rounded-sm object-contain transition-all duration-400 hover:-translate-y-1 hover:scale-102 p-4"
            src={product?.thumbnail as string}
            alt="Product Image"
            fill
          />
        </Link>
        <div className="w-full">
          <div className=" flex justify-between grow gap-6">
            <h1 className="font-main mb-2 text-[clamp(1rem,2vw,1.1rem)]">{product?.title}</h1>

            <h2 className="font-main pb-2 text-[clamp(1rem,3vw,1.1rem)] font-semibold ">
              {user
                ? '$ ' + ((product?.price ?? 0) * (product?.quantity ?? 0)).toFixed(2)
                : '$ ' + product?.totalPrice}
            </h2>
          </div>
          {isCart && (
            <div className="flex flex-col md:items-center md:flex-row">
              <p>Qty.</p>
              <div className="bg-white m-3 flex max-w-50 items-center justify-between rounded-sm text-xs shadow-md outline-secondary-light/60 outline-1">
                <Button
                  onClick={
                    user
                      ? () => removeFromAuthCart(product as Product, user as User)
                      : () => handleRemoveFromGuestCart(product?.id as number)
                  }
                  className="hover:bg-primary-light/20 px-4 py-2 transition duration-400">
                  -
                </Button>
                <p className="px-1 w-[2ch] text-center">{product?.quantity}</p>
                <Button
                  onClick={
                    user
                      ? () => addToAuthCart(product as Product, user as User)
                      : () => handleAddToGuestCart()
                  }
                  className="hover:bg-primary-light/20 px-4 py-2 transition duration-400">
                  +
                </Button>
              </div>
              <div className="text-secondary-light flex self-center">
                <Button
                  onClick={
                    user
                      ? () => clearAuthItem(product as Product, user as User)
                      : () => handleClearGuestItem(product?.id as number)
                  }>
                  <Image src="/trash.svg" alt="trash icon" width={25} height={25} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </article>
      <hr className="text-gray-400" />
    </section>
  );
};

export default memo(CheckoutItem);
