'use client';

import { useCallback, useState } from 'react';
import SidebarItem from '../ui/SidebarItem';

export default function FilterToggle() {
  const handleItemClick = useCallback((item: string) => {
    setActiveCategory(item);
  }, []);

  const handleClick = useCallback(
    (newValue: string) => {
      handleItemClick(newValue);
    },
    [handleItemClick]
  );

  const categories = ['All', 'Men', 'Women', 'Jewelery', 'Electronic', 'Aliens', 'Cows', 'Sheep'];
  const [activeCategory, setActiveCategory] = useState<string>('All');

  return (
    <ul className="*:dark:text-secondary-dark mb-4 h-[55vh] overflow-y-auto border-b-4">
      {categories.map((item) => (
        <SidebarItem key={item} item={item} isActive={activeCategory === item} handleItemClick={handleClick} />
      ))}
    </ul>
  );
}
