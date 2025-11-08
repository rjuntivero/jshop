'use client';
import { useState, useCallback, useEffect } from 'react';
import Searchbar from '@/components/ui/Searchbar';
import Sidebar from '@/components/layouts/Sidebar';
import Footer from '@/components/layouts/Footer';
import React from 'react';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { AnimatePresence, motion } from 'motion/react';
import { Product } from '@/types/Product';
import LazyProductCard from '../ui/LazyProductCard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebaseConfig';

const ProductGrid = ({ products }: { products: Product[] }) => {
  const [search, setSearch] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const filteredProducts = useFilteredProducts(products, search, activeCategory);
  const [user] = useAuthState(auth);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleItemClick = useCallback((item: string) => {
    setActiveCategory(item);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  //
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
      <main className=" min-h-screen  relative flex   transition-all duration-500">
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

        <motion.section layout="position" className=" flex flex-col gap-2 w-full ">
          <div className="shadow-md bg-background-light dark:bg-background-dark shadow-b sticky top-27 z-2 px-5 md:px-8 py-3  md:py-6 flex items-center justify-between">
            <Searchbar
              results={filteredProducts?.length || 0}
              showSidebar={handleSidebarToggle}
              sideBarVisible={showSidebar}
            />
          </div>

          <div className="h-full transition-all duration-500 mb-6 md:p-3 lg:p-5">
            <article className="relative grid grid-cols-2 gap-2 px-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
              {filteredProducts?.map((product) => (
                <LazyProductCard key={String(product.id)} product={product} user={user} />
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
