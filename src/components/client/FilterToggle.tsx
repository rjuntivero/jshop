'use client';

import SidebarItem from '../ui/SidebarItem';

interface SidebarItemsProps {
  activeCategory: string;
  onCategoryChange: (newCategory: string) => void;
}

export default function SidebarItems({ activeCategory, onCategoryChange }: SidebarItemsProps) {
  const categories = ['All', 'Men', 'Women', 'Jewelery', 'Electronic', 'Aliens', 'Cows', 'Sheep'];

  return (
    <ul className="*:dark:text-secondary-dark mb-4 h-[55vh] overflow-y-auto border-b-4">
      {categories.map((item) => (
        <SidebarItem key={item} item={item} isActive={activeCategory === item} handleItemClick={() => onCategoryChange(item)} />
      ))}
    </ul>
  );
}
