'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import SidebarItem from '../ui/SidebarItem';
import Button from '../ui/Button';
import UpArrowIcon from '../icons/UpArrowIcon';

interface SidebarProps {
  className?: string;
  activeCategory: string;
  handleItemClick: (newValue: string) => void;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, activeCategory, handleItemClick, toggleSidebar }) => {
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

  const categories = ['All', 'Men', 'Women', 'Jewelery', 'Electronic'];

  return (
    <>
      <aside className={`${className} outline-primary-light  text-primary-light relative z-100 py-[42px] border-t-2 lg:border-r-1 grow `}>
        <div className="items-center flex justify-between font-sub-header pr-8 border-b-primary-light dark:border-secondary-dark border-b-4 text-[2.7rem] font-bold  px-2">
          <h1 className="">Categories</h1>
          <button onClick={toggleSidebar} className="lg:hidden block font-light cursor-pointer">
            x
          </button>
        </div>

        <ul className="*:dark:text-secondary-dark overflow-y-auto  h-[85%]">
          {categories.map((item) => (
            <SidebarItem key={item} item={item} isActive={activeCategory === item} handleItemClick={handleClick} />
          ))}
        </ul>
        {/* <div className="bg-primary-light dark:bg-primary-dark absolute bottom-11 left-0 m-0 w-full  py-0.5"></div>
        <div className="bg-primary-light dark:bg-primary-dark absolute bottom-0 left-0 m-0 w-full  py-5"></div> */}
        <div className="font-sub-header text-secondary-light p-4 hidden text-xl lg:block">
          <Button className="group flex gap-4 font-semibold " onClick={scrollToTop}>
            <h1>Scroll to Top</h1>
            <UpArrowIcon className="transition-all duration-700 group-hover:animate-bounce" />
          </Button>
        </div>
      </aside>
    </>
  );
};

export default memo(Sidebar);
