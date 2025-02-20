import React, { memo } from 'react'
import Button from '../ui/Button'

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
    <div
      className={`${className} outline-primary-light dark:outline-primary-dark dark:text-secondary-dark text-primary-light relative max-w-[310px] rounded-r-3xl px-[18px] py-[42px] outline-5`}
    >
      <div className="sidebar-title font-big-header border-b-primary-light dark:border-secondary-dark mb-4 border-b-4 text-3xl">
        <h1 className="">Products</h1>
      </div>

      <ul className="mb-4 overflow-y-auto border-b-4">
        {categories.map((item) => (
          <li key={item}>
            <Button
              onClick={() => handleItemClick(item)}
              className="group relative mb-4 w-full rounded-full px-4 py-4 text-left font-bold tracking-widest transition-colors duration-300 ease-in-out"
            >
              <span
                className={`bg-secondary-light absolute top-0 left-0 -z-10 h-full w-full origin-left rounded-r-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 ${
                  activeCategory === item
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-[-100%]'
                }`}
              />
              <span
                className={`relative dark:text-secondary-dark${
                  activeCategory === item
                    ? 'dark:text-secondary-dark text-white'
                    : 'dark:text-background-dark group-hover:text-white'
                }`}
              >
                {item}
              </span>
            </Button>
          </li>
        ))}
      </ul>

      <div className="bg-primary-light dark:bg-primary-dark absolute bottom-0 left-0 m-0 w-full rounded-br-xl py-5"></div>
    </div>
  )
}

export default memo(Sidebar)
