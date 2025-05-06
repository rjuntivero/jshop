'use client';
import { useState, useCallback } from 'react';
import Navbar from '@/components/layouts/Navbar';
import Searchbar from '@/components/ui/Searchbar';
import Sidebar from '@/components/layouts/Sidebar';
import ProductCard from '@/components/ui/ProductCard';
import Footer from '@/components/layouts/Footer';
import LoadWheel from '@/components/ui/LoadWheel';
import ErrorMessage from '@/components/ui/ErrorMessage';
import React from 'react';
import CartSidebar from '@/components/layouts/CartSidebar';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import MenuIcon from '@/components/icons/MenuIcon';
import Button from '@/components/ui/Button';
import Directory from '@/components/layouts/Directory';
import CartIcon from '@/components/icons/CartIcon';
import { useAppSelector } from '@/state/hooks';
import { useDispatch } from 'react-redux';
import { toggleCart, toggleDirectory } from '@/features/cartSlice';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { AnimatePresence, motion } from 'motion/react';

const Catalog = () => {
  const [search, setSearch] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useFetchProducts();

  const filteredProducts = useFilteredProducts(products, search, activeCategory);

  const handleDirectoryToggle = useCallback(() => {
    dispatch(toggleDirectory());
  }, [dispatch]);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCartToggle = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  const handleItemClick = useCallback((item: string) => {
    setActiveCategory(item);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  return (
    <>
      <header>
        <Navbar className="border-b-bg-primary-light flex items-center justify-between border-b-3 transition-all">
          <div className="left flex items-center gap-6">
            <Button
              onClick={handleDirectoryToggle}
              className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2"
            >
              <MenuIcon color="#442727" />
            </Button>
            <Directory className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`} />
          </div>
          <h1 className="motion-preset-blur-down logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest delay-700 duration-500 ease-in">JSHOP</h1>
          <div className="right flex items-center gap-6">
            <Button
              onClick={handleCartToggle}
              className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
            >
              <CartIcon width={44} height={40} color="#442727" />
            </Button>
          </div>
        </Navbar>
      </header>

      <CartSidebar onClose={handleCartToggle} className={`bg-background-light fixed top-0 right-0 z-99999 flex h-dvh w-93 md:w-106 flex-col p-8 transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`} />
      <main className="relative flex h-full gap-6 transition-all duration-500 ">
        <AnimatePresence mode="popLayout">
          {showSidebar && (
            <motion.aside
              className="sticky top-0 self-start flex flex-col min-w-[300px] pt-15 hidden lg:block"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="sidebar"
            >
              <Sidebar activeCategory={activeCategory} handleItemClick={handleItemClick} className="hidden lg:block " />
            </motion.aside>
          )}
        </AnimatePresence>

        <motion.section layout="position" className="flex flex-col gap-2 overflow-x-hidden w-full">
          <div className="bg-background-light dark:bg-background-dark shadow-b sticky top-0 z-2 px-3 py-3 md:px-12 md:py-5">
            <Searchbar input={search} onChange={handleSearch} results={filteredProducts?.length || 0} showSidebar={handleSidebarToggle} sideBarVisible={showSidebar} />
          </div>

          <div className="h-full transition-all duration-500">
            {isLoading && (
              <div className="flex w-full items-center justify-center">
                <LoadWheel />
              </div>
            )}
            <article className="relative grid grid-cols-2 gap-2 px-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
              {error && <ErrorMessage />}
              {!isLoading &&
                !error &&
                filteredProducts?.map((product) => (
                  <ProductCard key={String(product.id)} product={product} productName={product.title} productType={product.category.charAt(0).toUpperCase() + product.category.slice(1)} imageURL={product.image} productPrice={product.price} />
                ))}
            </article>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
};

export default Catalog;
