'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import SidebarItem from '../ui/SidebarItem';
import Button from '../ui/Button';
import UpArrowIcon from '../icons/UpArrowIcon';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { capitalizeFirst } from '@/app/lib/utils';

interface SidebarProps {
  className?: string;
  activeCategory: string;
  handleItemClick: (newValue: string) => void;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  activeCategory,
  handleItemClick,
  toggleSidebar,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClick = useCallback(
    (newValue: string) => {
      handleItemClick(newValue);
      if (isSmallScreen) {
        scrollToTop();
      }
    },
    [handleItemClick, isSmallScreen, scrollToTop]
  );

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { data: products } = useFetchProducts();

  const categories = [
    'All',
    ...Array.from(new Set(products?.map((item) => capitalizeFirst(item.category.toString())))),
  ];

  return (
    <>
      <aside className="outline-primary-light text-primary-light relative z-100 h-screen flex flex-col border-r-1 pt-[42px] ">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between font-sub-header pr-8 border-b-1 border-b-primary-light text-[2.7rem] font-bold px-2">
          <h1>Categories</h1>
          <button onClick={toggleSidebar} className="lg:hidden block font-light cursor-pointer">
            x
          </button>
        </div>

        {/* Scrollable middle */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ul className="flex flex-col *:dark:text-secondary-dark">
            {categories.map((item) => (
              <SidebarItem
                key={item}
                item={item}
                isActive={activeCategory === item}
                handleItemClick={handleClick}
              />
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 font-sub-header text-secondary-light p-4 hidden text-xl lg:block">
          <Button className="group flex gap-4 font-semibold" onClick={scrollToTop}>
            <h1>Scroll to Top</h1>
            <UpArrowIcon className="transition-all duration-700 group-hover:animate-bounce" />
          </Button>
        </div>
      </aside>
    </>
  );
};

export default memo(Sidebar);
