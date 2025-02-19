import React, { useState } from 'react'
import Button from '../ui/Button'

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [activeItem, setActiveItem] = useState<string>('')

  const categories = [
    'Men',
    'Women',
    'Kids',
    'Dogs',
    'Aliens',
    'Cows',
    'Sheep',
    'Earthbenders',
  ]

  const handleItemClick = (item: string) => {
    setActiveItem(item)
  }

  return (
    <div
      className={`${className} outline-primary-light text-primary-light relative rounded-r-3xl px-[18px] py-[42px] outline-5`}
    >
      <h1 className="sidebar-title font-big-header border-b-primary-light mb-4 border-b-4 text-3xl">
        Products
      </h1>

      <ul className="mb-4 overflow-y-auto border-b-4">
        {categories.map((item) => (
          <li key={item}>
            <Button
              onClick={() => handleItemClick(item)}
              className="group relative mb-4 w-full rounded-full px-4 py-4 text-left font-bold tracking-widest transition-colors duration-300 ease-in-out"
            >
              <span
                className={`bg-secondary-light absolute top-0 left-0 -z-10 h-full w-full origin-left rounded-r-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 ${
                  activeItem === item
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-[-100%]'
                }`}
              />
              <span
                className={`relative transition-colors duration-300 ${
                  activeItem === item
                    ? 'text-white'
                    : 'text-primary-light delay-150 group-hover:text-white'
                }`}
              >
                {item}
              </span>
            </Button>
          </li>
        ))}
      </ul>

      <div className="bg-primary-light absolute bottom-0 left-0 m-0 w-full rounded-br-xl py-5"></div>
    </div>
  )
}

export default Sidebar
