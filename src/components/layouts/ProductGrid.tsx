'use client';
import { useState, useCallback, useEffect } from 'react';
import Navbar from '@/components/layouts/Navbar';
import Searchbar from '@/components/ui/Searchbar';
import Sidebar from '@/components/layouts/Sidebar';
import Footer from '@/components/layouts/Footer';
import React from 'react';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import MenuIcon from '@/components/icons/MenuIcon';
import Button from '@/components/ui/Button';
import Directory from '@/components/layouts/Directory';
import CartIcon from '@/components/icons/CartIcon';
import { useAppSelector } from '@/state/hooks';
import { useDispatch } from 'react-redux';
import { toggleCart, toggleDirectory } from '@/features/cartSlice';
import { AnimatePresence, motion } from 'motion/react';
import { Product } from '@/types/Product';
import LazyProductCard from '../ui/LazyProductCard';
import CartSidebar from '@/components/layouts/CartSidebar';

const ProductGrid = ({ products }: { products: Product[] }) => {
  const [search, setSearch] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();

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

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // set sidebar to false by default for small devices
  useEffect(() => {
    const isSmallScreen = window.innerWidth <= 768;
    if (isSmallScreen) {
      setShowSidebar(false);
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background-light">
        <Navbar className="flex items-center justify-between transition-all border-b-1">
          <div className="flex items-center gap-6">
            <Button
              onClick={handleDirectoryToggle}
              className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2">
              <MenuIcon color="#442727" />
            </Button>
            <Directory className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`} />
          </div>
          <h1 className="motion-preset-blur-down logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest delay-700 duration-500 ease-in">
            JSHOP
          </h1>
          <div className="right flex items-center gap-6">
            <Button
              onClick={handleCartToggle}
              className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors">
              <CartIcon
                width={44}
                height={40}
                color="#442727"
              />
            </Button>
          </div>
        </Navbar>
      </header>

      <CartSidebar
        onClose={handleCartToggle}
        className={`bg-background-light fixed top-0 right-0 z-99999 flex h-dvh w-93 md:w-106 flex-col outline-1 transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      />
      <main className=" min-h-screen bg-background-light relative flex   transition-all duration-500">
        <AnimatePresence mode="popLayout">
          {showSidebar && (
            <motion.aside
              className="bottom-0 fixed lg:w-[fit-content] w-full bg-background-light z-9 lg:sticky lg:top-28 self-start lg:flex flex-col lg:h-full grow lg:min-h-screen"
              initial={isSmallScreen ? { y: '100%' } : { x: 0 }}
              animate={isSmallScreen ? { y: 0 } : { x: 0 }}
              exit={isSmallScreen ? { y: '100%' } : { x: -300 }}
              transition={{ duration: 0.3 }}
              key="sidebar">
              <Sidebar
                toggleSidebar={handleSidebarToggle}
                activeCategory={activeCategory}
                handleItemClick={handleItemClick}
                className=" lg:block "
              />
            </motion.aside>
          )}
        </AnimatePresence>

        <motion.section
          layout="position"
          className=" flex flex-col gap-2 w-full ">
          <div className="shadow-md bg-background-light dark:bg-background-dark shadow-b sticky top-27 z-2 px-5 md:px-8 py-3  md:py-6">
            <Searchbar
              input={search}
              onChange={handleSearch}
              results={filteredProducts?.length || 0}
              showSidebar={handleSidebarToggle}
              sideBarVisible={showSidebar}
            />
          </div>

          <div className="h-full transition-all duration-500 mb-6 md:p-3 lg:p-5">
            <article className="relative grid grid-cols-2 gap-2 px-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
              {filteredProducts?.map((product) => (
                <LazyProductCard
                  key={String(product.id)}
                  product={product}
                />
              ))}
            </article>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
};

export default ProductGrid;
