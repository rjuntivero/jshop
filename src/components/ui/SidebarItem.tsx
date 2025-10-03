import React, { memo, useState } from 'react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '@/state/hooks';
import { setSearchQuery } from '@/features/cartSlice';

interface SidebarItemProps {
  item: string;
  isActive: boolean;
  activeValue?: string;
  handleItemClick: (newValue: string) => void;
  hasDropdown?: boolean;
  childrenItems?: { label: string; value: string }[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  activeValue,
  handleItemClick,
  hasDropdown = false,
  childrenItems = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (hasDropdown) {
      setIsOpen(!isOpen);
    } else {
      handleItemClick(item);
      dispatch(setSearchQuery(item));
    }
  };

  return (
    <li>
      <Button
        onClick={handleClick}
        className={`relative w-full px-4 py-2 text-left transition-colors duration-300 ease-in-out ${
          !hasDropdown ? 'group hover:bg-secondary-light/40' : ''
        }`}>
        {!hasDropdown && (
          <span
            className={`bg-secondary-light/70 absolute top-0 left-0 -z-10 h-full w-full origin-left opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 ${
              isActive ? 'translate-x-0 opacity-100' : 'translate-x-[-100%]'
            }`}
          />
        )}

        <span
          className={`text-lg relative dark:text-secondary-dark ${
            isActive
              ? 'dark:text-background-dark text-white'
              : !hasDropdown
              ? 'dark:text-background-dark group-hover:text-white'
              : 'dark:text-background-dark'
          }`}>
          {item} {hasDropdown && (isOpen ? '▾' : '▸')}
        </span>
      </Button>

      {/* Animate children dropdown */}
      {hasDropdown && (
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className=" flex flex-col  overflow-hidden">
              {childrenItems.map(({ label, value }) => (
                <li key={value} className="border-t-1 last:border-b-1 ">
                  <Button
                    onClick={() => handleItemClick(value)}
                    className={`hover:bg-secondary-light/70   hover:text-white group w-full pl-10 p-2 text-left text-base transition-colors duration-300 ease-in-out ${
                      activeValue === value
                        ? 'bg-secondary-light/70 text-white dark:text-background-dark'
                        : ''
                    }`}>
                    {label}
                  </Button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </li>
  );
};

export default memo(SidebarItem);
