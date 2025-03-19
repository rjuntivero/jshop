import React, { memo, useCallback } from 'react'
import SidebarItem from '../ui/SidebarItem'
import Button from '../ui/Button'
import UpArrowIcon from '../icons/UpArrowIcon'

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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  // Prevent re-creating the function unless handleItemClick changes

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
    <>
      <aside
        className={`${className} outline-primary-light dark:outline-primary-dark dark:text-secondary-dark text-primary-light bg-background-light relative z-100 mb-8 h-[75vh] max-w-[310px] rounded-r-3xl px-[18px] py-[42px] outline-5`}
      >
        <div className="font-sub-header sidebar-title border-b-primary-light dark:border-secondary-dark mb-4 border-b-4 text-4xl font-black tracking-widest">
          <h1>Products</h1>
        </div>

        <ul className="*:dark:text-secondary-dark mb-4 h-[55vh] overflow-y-auto border-b-4">
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
      </aside>
      <aside className="font-sub-header text-secondary-light bg-primary-light rounded-r-full p-8 pl-20 text-2xl">
        <Button className="group flex gap-4" onClick={scrollToTop}>
          <h1>Scroll to Top</h1>
          <UpArrowIcon className="transition-all duration-700 group-hover:animate-bounce" />
        </Button>
      </aside>
    </>
  )
}

export default memo(Sidebar)
