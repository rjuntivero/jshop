import { memo } from 'react';
import Button from './Button';
import { Product } from '../../types/Product';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart, clearItem, removeFromCart } from '../../features/cartSlice';

interface T {
  product?: Product;
  productName?: string;
  productPrice?: number;
  productType?: string;
  totalPrice?: number;
  imageURL?: string;
  count?: number;
}

const CheckoutItem: React.FC<T> = ({
  product,
  productName,
  productType,
  totalPrice,
  imageURL,
  count,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...(product as Product),
        count: 1,
      })
    );
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const handleClearItem = (id: number) => {
    dispatch(clearItem(id));
  };
  return (
    <section className="mb-8">
      <hr className="text-gray-400" />
      <article className="motion-preset-blur-down flex flex-col gap-8 duration-400 sm:flex-row  p-2 md:p-6 ">
        <Link
          href={`/products/${product!.id}`}
          className="aspect-square w-full md:w-[clamp(100px,20vw,400px)] h-[clamp(150px,20vw,400px)] relative bg-white outline-1 outline-primary-light/10 shadow-sm">
          <Image
            className="rounded-sm object-contain transition-all duration-400 hover:-translate-y-1 hover:scale-102 p-4"
            src={imageURL!}
            alt="Product Image"
            fill
          />
        </Link>
        <div>
          <div className="md:p-4">
            <h1 className="font-main mb-2 text-[clamp(1rem,2vw,2rem)]">{productName}</h1>
            <h1 className="font-main text-secondary-light mb-2 text-[clamp(0.8rem,1.5vw,1.4rem)]">
              {productType}
            </h1>
            <h2 className="font-main pb-2 text-[clamp(1.5rem,3vw,2.4rem)] font-semibold">
              {'$' + totalPrice?.toFixed(2)}
            </h2>
          </div>
          <div className="flex flex-col md:items-center md:flex-row">
            <div className="bg-white m-3 flex max-w-50 items-center justify-between rounded-sm text-xl shadow-md outline-secondary-light/60 outline-1">
              <Button
                onClick={() => handleRemoveFromCart(product?.id as number)}
                className="hover:bg-primary-light/20 px-4 py-2 transition duration-400">
                -
              </Button>
              <p className="px-1 w-[2ch] text-center">{count}</p>
              <Button
                onClick={handleAddToCart}
                className="hover:bg-primary-light/20 px-4 py-2 transition duration-400">
                +
              </Button>
            </div>
            <div className="text-secondary-light flex self-center">
              <Button onClick={() => handleClearItem(product?.id as number)}>Delete</Button>
            </div>
          </div>
        </div>
      </article>
      <hr className="text-gray-400" />
    </section>
  );
};

export default memo(CheckoutItem);
