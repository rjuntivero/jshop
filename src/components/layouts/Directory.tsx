import Link from 'next/link';
import CloseIcon from '../icons/CloseIcon';
import Button from '../ui/Button';
import Overlay from './Overlay';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/state/hooks';
import { useDispatch } from 'react-redux';
import { toggleDirectory } from '../../features/cartSlice';
import { memo } from 'react';

type DirectoryProps = {
  className: string;
};

const Directory: React.FC<DirectoryProps> = ({ className }) => {
  const location = usePathname();
  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen);
  const dispatch = useDispatch();

  const handleDirectoryToggle = () => {
    dispatch(toggleDirectory());
  };

  const getLinkClass = (path: string) => {
    return location === path ? 'text-secondary-light border-b-2' : 'hover:text-secondary-light hover:border-b-2';
  };

  return (
    <>
      <aside className={className + ' bg-background-light fixed top-0 z-1000 h-full w-[300px] p-8 transition-all duration-400'}>
        <Button onClick={handleDirectoryToggle} className="flex w-full justify-end">
          <CloseIcon width={43} height={43} color="#4D2C2C" />
        </Button>
        <div className="font-semibold text-primary-light flex h-full items-center justify-center pt-6 text-2xl">
          <nav className="flex flex-col gap-20">
            <h1>
              <Link href="/" className={getLinkClass('/')} onClick={handleDirectoryToggle}>
                Home
              </Link>
            </h1>
            <h1>
              <Link href="/products" className={getLinkClass('/products')} onClick={handleDirectoryToggle}>
                Products
              </Link>
            </h1>
            <h1>
              <Link href="/my-cart" className={getLinkClass('/my-cart')} onClick={handleDirectoryToggle}>
                Cart
              </Link>
            </h1>
          </nav>
        </div>
      </aside>
      <Overlay className={`bg-black fixed inset-0 z-999 h-full w-full transition-all duration-400 ease-in-out ${isDirectoryOpen ? 'opacity-45' : 'pointer-events-none opacity-0'}`} />
    </>
  );
};

export default memo(Directory);
