import useAuthCart from '@/hooks/useAuthCart';
import { useAppSelector } from '@/state/hooks';
import { User } from 'firebase/auth';
import CheckoutItem from './CheckoutItem';
import Link from 'next/link';

interface Props {
  user?: User | null;
  isCart?: boolean;
}

export default function CheckoutItemList({ user, isCart = false }: Props) {
  // auth users
  const [authCart] = useAuthCart(user ?? null);

  // guest users
  const guestCart = useAppSelector((state) => state.cart.items);

  const cart = user ? authCart : guestCart;
  return (
    <div className="relative  flex flex-col ">
      {cart.length > 0 ? (
        cart?.map((item) => <CheckoutItem key={String(item.id)} product={item} isCart={isCart} />)
      ) : (
        <div className="text-[clamp(0.2rem, 1vw, 1.5rem)]">
          <h1 className="font-bold text-black">Your JSHOP cart is empty...</h1>
          <Link href="/products" className="text-black">
            Your shopping cart lives to serve --- Go out there and fill it with items!!
          </Link>
        </div>
      )}
    </div>
  );
}
