'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFetchProduct } from '@/hooks/useFetchProduct';
import Navbar from '@/components/layouts/Navbar';
import LoadWheel from '@/components/ui/LoadWheel';
import Button from '@/components/ui/Button';
import MenuIcon from '@/components/icons/MenuIcon';
import Directory from '@/components/layouts/Directory';
import CartIcon from '@/components/icons/CartIcon';
import CartSidebar from '@/components/layouts/CartSidebar';
import Footer from '@/components/layouts/Footer';
import { Product } from '@/types/Product';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart, toggleDirectory } from '@/features/cartSlice';
import { useAppSelector } from '@/state/hooks';
import Image from 'next/image';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useFetchProduct(Number(id));
  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const handleDirectoryToggle = () => {
    dispatch(toggleDirectory());
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  return (
    <>
      <Navbar className="bg-background-light z-10 mb-8 flex items-center justify-between border-b-3">
        <div className="left flex items-center gap-6">
          <Button onClick={handleDirectoryToggle} className="dark:bg-primary-dark navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2">
            <MenuIcon color="#442727" />
          </Button>
          <Directory className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`} />
        </div>
        <h1 className="logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest">JSHOP</h1>
        <div className="right flex items-center gap-6">
          <Button onClick={handleCartToggle} className="d flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors">
            <CartIcon width={44} height={40} color="#442727" />
          </Button>
        </div>
      </Navbar>

      <CartSidebar onClose={handleCartToggle} className={`bg-background-light fixed top-0 right-0 z-99999 flex h-dvh flex-col p-8 transition-transform duration-300 ease-in-out w- 93 md:w-106 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`} />
      {isLoading && (
        <div className="flex h-[600px] items-center justify-center">
          <LoadWheel />
        </div>
      )}
      {error && <ErrorMessage />}

      {product && (
        <main className="text-primary-light relative z-5 my-10 flex w-full flex-col justify-center px-[clamp(0.3rem,3%,48rem)] transition-all duration-400 md:px-[clamp(0.3rem,10%,48rem)]">
          <div className="bg-secondary-light/70 absolute -bottom-12 left-30 z-1 hidden h-[128px] w-[128px] rounded-full p-42 md:block"></div>
          <div className="bg-secondary-light/70 absolute left-20 z-1 hidden rounded-full p-8 md:block"></div>
          <div className="bg-secondary-light/70 absolute bottom-68 left-38 z-1 hidden rounded-full p-3 md:block"></div>
          <div className="bg-secondary-light/70 absolute -top-12 right-30 z-1 hidden h-[128px] w-[128px] rounded-full p-42 md:block"></div>
          <div className="bg-secondary-light/70 absolute right-30 bottom-60 z-1 hidden rounded-full p-3 md:block"></div>
          <div className="bg-secondary-light/70 absolute right-35 bottom-40 z-1 hidden rounded-full p-8 md:block"></div>

          <div className="motion-ease-bounce motion-preset-blur-down-md -motion-translate-y-in-25 z-3 box-border flex w-full flex-col gap-5 md:gap-25 rounded-t-md border-5 bg-white p-6 duration-900 md:flex-row md:py-12">
            <div className="relative w-full max-w-[400px] aspect-square mx-auto ">
              <Image src={product.image!} alt="PRODUCT IMAGE" fill className=" mx-auto rounded-lg object-contain object-center transition-all duration-700 group-hover:scale-102" />
            </div>
            {/* <Image src={imageURL!} alt="PRODUCT IMAGE" fill className="rounded-lg object-contain object-center transition-all duration-700 group-hover:scale-102" /> */}
            <div className="def-padding pl-0!">
              <div className="text-3xl">
                <h1 className="font-sub-header">{product?.title}</h1>
                <h1 className="text-secondary-light pb-6 text-xl">{product?.category}</h1>
              </div>
              <h1 className="font-sub-header !pb-0">About this item</h1>
              <h1 className="pt-1! pb-10 text-[clamp(1em,1.2vw,4em)]">{product?.description}</h1>
              <div className="flex flex-col items-start justify-start md:flex-row md:items-center">
                <h1 className="def-padding pl-0! text-3xl font-bold">{`$${product?.price}`}</h1>
                <Button
                  className="bg-secondary-light border-primary-light add-to-cart flex items-center justify-end gap-4 justify-self-start rounded-full border-2 p-2 md:col-start-3 md:justify-self-center"
                  onClick={() => addToCart(product as Product)}
                >
                  <h1 className="font-sub-header">Add To Cart</h1>
                  <CartIcon width={28} height={28} color="#442727" />
                </Button>
              </div>
              <div>
                <Link className="" href="/products">
                  <h1 className="font-sub-header hover:text-secondary-light cursor-pointer pt-12 text-end text-sm">Back to Products...</h1>
                </Link>
              </div>
            </div>
          </div>

          <div className="motion-translate-y-in-75 bg-primary-light def-padding motion-ease-bounce z-4 mt-1 h-4 w-full rounded-b-md shadow-md transition-all duration-1000"></div>
        </main>
      )}

      <Footer />
    </>
  );
};

export default ProductPage;
