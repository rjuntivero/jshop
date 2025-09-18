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
import { useState } from 'react';
import ProductPreview from '@/components/ui/ProductPreview';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useFetchProduct(Number(id));
  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(1);
  const similarProducts: Product[] = [
    {
      id: 20,
      title: 'DANVOUY Womens T Shirt Casual Cotton Short',
      price: 12.99,
      description: '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
      category: "women's clothing",
      image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png',
      rating: { rate: 3.6, count: 145 },
      count: 0,
      totalPrice: 0,
    },
  ];

  const handleDirectoryToggle = () => {
    dispatch(toggleDirectory());
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  return (
    <div className="min-h-screen flex flex-col gap-12">
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

      <CartSidebar
        onClose={handleCartToggle}
        className={`bg-background-light fixed top-0 right-0 z-99999 flex h-dvh w-93 md:w-106 flex-col outline-1 transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      />
      {isLoading && (
        <div className="flex h-[600px] items-center justify-center">
          <LoadWheel />
        </div>
      )}
      {error && <ErrorMessage />}

      {product && (
        <main className="grow text-primary-light relative flex w-full flex-col justify-center transition-all duration-400 px-[clamp(0px,2%,50px)]">
          {/* background design */}
          {/* <div className="bg-secondary-light/70 absolute -bottom-12 left-30 z-1 hidden h-[128px] w-[128px] rounded-full p-42 md:block"></div>
          <div className="bg-secondary-light/70 absolute left-20 z-1 hidden rounded-full p-8 md:block"></div>
          <div className="bg-secondary-light/70 absolute bottom-68 left-38 z-1 hidden rounded-full p-3 md:block"></div>
          <div className="bg-secondary-light/70 absolute -top-12 right-30 z-1 hidden h-[128px] w-[128px] rounded-full p-42 md:block"></div>
          <div className="bg-secondary-light/70 absolute right-30 bottom-60 z-1 hidden rounded-full p-3 md:block"></div>
          <div className="bg-secondary-light/70 absolute right-35 bottom-40 z-1 hidden rounded-full p-8 md:block"></div> */}

          <article className="z-3 box-border flex w-full flex-col md:items-center gap-8 md:p-6 p-0 md:flex-row ">
            <div className="md:px-6">
              {/* image container */}
              <div className="motion-preset-blur-down-md relative w-full aspect-square mx-auto p-4 bg-secondary-dark flex rounded-xl shadow-md outline-1 outline-primary-dark">
                <Image src={product.image!} alt="PRODUCT IMAGE" width={500} height={500} className="max-w-[500px] mx-auto  object-contain object-center transition-all duration-700 group-hover:scale-102" priority />
              </div>
            </div>
            <section className="flex flex-col gap-3 max-w-[500px] motion-preset-blur-down-md">
              <header className="w-full ">
                <h1 className="font-sub-header font-bold text-5xl">{product?.title}</h1>
                <h2 className="text-secondary-light text-2xl">{product?.category}</h2>
                <p>{product?.rating.rate} stars</p>
              </header>
              <p className="py-4 text-[clamp(0.9em,1vw,2em)]">{product?.description}</p>
              <div className="flex flex-col items-start justify-start gap-3">
                <h1 className="text-3xl font-bold">{`$${product?.price}`}</h1>
                <div className="flex gap-3 md:flex-row flex-col w-full">
                  <div className=" w-[200px] flex gap-3 bg-white justify-around items-center">
                    <Button className="p-3 grow h-full hover:bg-gray-200 transition-all duration-300">-</Button>
                    <span className="px-10">1</span>
                    <Button className="p-3 grow h-full hover:bg-gray-200 transition-all duration-300">+</Button>
                  </div>
                  <Button className="w-full bg-secondary-light border-primary-light flex items-center justify-center p-3 gap-3" onClick={() => addToCart(product as Product)}>
                    <h1 className="font-sub-header">Add To Cart</h1>
                    <CartIcon width={28} height={28} color="#442727" />
                  </Button>
                </div>
              </div>
              <Link className="" href="/products">
                <h1 className="font-sub-header hover:text-secondary-light cursor-pointer text-end text-sm">Back to Products...</h1>
              </Link>
            </section>
          </article>
        </main>
      )}

      <section className="p-20 border-t-1 border-b-1 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl text-primary-light ">Similar Products</h1>
        <div className="grid grid-rows-[repeat(auto-fill,minmax(200px,1fr))] grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {similarProducts?.map((product) => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section>
        <div className="bg-primary-light mb-1 w-full pt-1"></div>
        <Footer />
      </section>
    </div>
  );
};

export default ProductPage;
