import React, { memo, useState } from 'react';
import Button from './Button';

interface SidebarItemProps {
  item: string;
  isActive: boolean;
  activeValue?: string; // <- for subcategories
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

  const handleClick = () => {
    if (hasDropdown) {
      setIsOpen(!isOpen);
    } else {
      handleItemClick(item);
    }
  };

  return (
    <li>
      <Button
        onClick={handleClick}
        className={`relative w-full  px-4 py-2 text-left transition-colors duration-300 ease-in-out ${
          !hasDropdown ? 'group hover:bg-secondary-light/40' : ''
        }`}>
        {/* Dont apply hover animation to parents with dropdown */}
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

      {/* Render children items if dropdown */}
      {hasDropdown && isOpen && (
        <ul className="flex flex-col">
          {childrenItems.map(({ label, value }) => (
            <li
              key={value}
              className={`border-t-1 last:border-b-1 hover:bg-secondary-light/40 transition-all duration-300`}>
              <Button
                onClick={() => handleItemClick(value)}
                className={`group w-full pl-10 p-2 text-left text-base transition-colors duration-300 ease-in-out ${
                  activeValue === value
                    ? 'bg-secondary-light/70 text-white dark:text-background-dark'
                    : ''
                }`}>
                {label}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(SidebarItem);
