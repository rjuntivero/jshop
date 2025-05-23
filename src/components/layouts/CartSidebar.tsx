import { Product } from '@/types/Product';
import Button from '../ui/Button';
import CartItem from '../ui/CartItem';
import CloseIcon from '../icons/CloseIcon';
import Link from 'next/link';
import { memo } from 'react';
import Overlay from './Overlay';
import { useAppSelector } from '@/state/hooks';

interface SidebarProps {
  onClose: () => void;
  product?: Product;
  className?: string;
}

const CartSidebar: React.FC<SidebarProps> = ({ onClose, className }) => {
  const cart = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector((state) => state.cart.totalPrice);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);

  return (
    <>
      <aside className={className + ' font-sub-header'}>
        <div className="relative mb-4 border-b-3 pb-2">
          <Button onClick={onClose} className="absolute -top-4 z-40">
            <CloseIcon width={43} height={43} color="#4D2C2C" />
          </Button>
          <h1 className="font-big-header text-primary-light self-center justify-self-center text-center text-3xl">My Cart</h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {cart &&
            cart?.map((item) => (
              <CartItem key={item.id} product={item} productName={item.title} productType={item.category} imageURL={item.image} count={item.count} productPrice={item.price} totalPrice={parseFloat((item.price * item.count).toFixed(2))} />
            ))}
          {cart?.length === 0 && <h1 className="font-main text-primary-light my-auto self-center text-xl">cart is empty...</h1>}
        </div>
        <div className="p-4 text-3xl">
          <h1 className="">{'Total: $' + cartTotal.toFixed(2)}</h1>
        </div>

        <Link onClick={onClose} href="/my-cart" className="bg-secondary-light z-40 mt-4 flex items-center justify-center rounded-sm p-4 text-black">
          Checkout
        </Link>
      </aside>
      <Overlay className={`bg-primary-light fixed inset-0 z-999 h-full w-full transition-all duration-400 ease-in-out ${isCartOpen ? 'opacity-20' : 'pointer-events-none opacity-0'}`} />
    </>
  );
};

export default memo(CartSidebar);
