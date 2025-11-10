import { Product } from '@/types/Product';
import Button from '../ui/Button';
import CartItem from '../ui/CartItem';
import CloseIcon from '../icons/CloseIcon';
import Link from 'next/link';
import { memo } from 'react';
import Overlay from './Overlay';
import { useAppSelector } from '@/state/hooks';
import CartIcon from '../icons/CartIcon';
import useAuthCart from '@/hooks/useAuthCart';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebaseConfig';

interface SidebarProps {
  onClose: () => void;
  product?: Product;
  className?: string;
}

const CartSidebar: React.FC<SidebarProps> = ({ onClose, className }) => {
  const [user] = useAuthState(auth);

  // auth users
  const [authCart] = useAuthCart(user ?? null);
  const cartTotal = user && authCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // guest users
  const guestCart = useAppSelector((state) => state.cart.items);
  const guestCartTotal = useAppSelector((state) => state.cart.totalPrice);
  const isCartOpen = useAppSelector((state) => state.ui.isCartOpen);

  const cart = user ? authCart : guestCart;

  console.log('CART ITEMS: ', cart);
  return (
    <>
      <aside className={className + ' font-sub-header'}>
        <header className="border-b-1 relative  outline-1 p-3 pb-2 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <CartIcon width={30} height={30} color="var(--color-primary-light)" />
            <h1 className="font-bold text-primary-light text-2xl">Cart</h1>
          </div>
          <Button onClick={onClose} className="">
            <CloseIcon width={40} height={40} color="#4D2C2C" />
          </Button>
        </header>
        <section className="flex flex-1 flex-col overflow-y-auto bg-white/50">
          {cart &&
            cart?.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                quantity={item.quantity}
                totalPrice={parseFloat((item.price * item.quantity).toFixed(2))}
              />
            ))}
          {cart?.length === 0 && (
            <h1 className="font-main text-primary-light my-auto self-center text-xl">
              cart is empty...
            </h1>
          )}
        </section>
        <div className="p-4 text-2xl flex justify-between border-t-1 border-b-1">
          <p>Total: </p>
          <p>$ {user ? (cartTotal?.toFixed(2) ?? 0) : guestCartTotal.toFixed(2)}</p>
        </div>
        <div className="p-4">
          <Link
            onClick={onClose}
            href="/my-cart"
            className=" ease-in outline-1 outline-secondary-light hover:bg-white hover:text-secondary-light transition-all duration-150 bg-secondary-light z-40 flex items-center justify-center rounded-sm p-4 text-primary-light font-semibold">
            Checkout
          </Link>
        </div>
      </aside>
      <Overlay
        className={`bg-black fixed inset-0 z-999 h-full w-full transition-all duration-400 ease-in-out ${
          isCartOpen ? 'opacity-45' : 'pointer-events-none opacity-0'
        }`}
      />
    </>
  );
};

export default memo(CartSidebar);
