import React, { memo } from 'react';
import Button from './Button';

interface ItemProps {
  item: string;
  isActive: boolean;
  handleItemClick: (newValue: string) => void;
}

const SidebarItem: React.FC<ItemProps> = ({ item, isActive, handleItemClick }) => {
  return (
    <li key={item}>
      <Button onClick={() => handleItemClick(item)} className="group relative mb-4 w-full rounded-full px-4 py-2 text-left  transition-colors duration-300 ease-in-out">
        <span
          className={`bg-secondary-light/70 absolute top-0 left-0 -z-10 h-full w-full origin-left  opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 ${
            isActive ? 'translate-x-0 opacity-100' : 'translate-x-[-100%]'
          }`}
        />
        <span className={`text-xl relative dark:text-secondary-dark ${isActive ? 'dark:text-background-dark text-white' : 'dark:text-background-dark group-hover:text-white'}`}>{item}</span>
      </Button>
    </li>
  );
};

export default memo(SidebarItem);
