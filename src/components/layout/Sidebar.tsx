import React, { memo, useCallback } from 'react'
import SidebarItem from '../ui/SidebarItem'

interface SidebarProps {
  className?: string
  activeCategory: string
  handleItemClick: (newValue: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  activeCategory,
  handleItemClick,
}) => {
  const handleClick = useCallback(
    (newValue: string) => {
      handleItemClick(newValue)
    },
    [handleItemClick], // Prevent re-creating the function unless handleItemClick changes
  )

  const categories = [
    'All',
    'Men',
    'Women',
    'Jewelery',
    'Electronic',
    'Aliens',
    'Cows',
    'Sheep',
  ]

  return (
    <main
      className={`${className} outline-primary-light dark:outline-primary-dark dark:text-secondary-dark text-primary-light relative max-w-[310px] rounded-r-3xl px-[18px] py-[42px] outline-5`}
    >
      <div className="sidebar-title font-big-header border-b-primary-light dark:border-secondary-dark mb-4 border-b-4 text-3xl">
        <h1>Products</h1>
      </div>

      <ul className="*:dark:text-secondary-dark mb-4 overflow-y-auto border-b-4">
        {categories.map((item) => (
          <SidebarItem
            key={item}
            item={item}
            isActive={activeCategory === item}
            handleItemClick={handleClick}
          />
        ))}
      </ul>

      <div className="bg-primary-light dark:bg-primary-dark absolute bottom-0 left-0 m-0 w-full rounded-br-xl py-5"></div>
    </main>
  )
}

export default memo(Sidebar)
