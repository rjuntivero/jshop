import Button from '../ui/Button'
import React, { ReactNode } from 'react'
import CartIcon from '../icons/CartIcon'
import { memo } from 'react'
import Directory from './Directory'
import MenuIcon from '../icons/MenuIcon'
import { useCart } from '../../hooks/useCart'
// import DarkModeToggle from '../ui/DarkModeToggle'

interface NavbarProps {
  children?: ReactNode
  className?: string
  toggleSidebar?: () => void
}

const Navbar: React.FC<NavbarProps> = ({
  className,
  toggleSidebar,
  children,
}) => {
  const { isDirectoryOpen, toggleDirectory } = useCart()
  return (
    <div className={className + ' def-padding'}>
      <div className="left flex items-center gap-6">
        <Button
          onClick={toggleDirectory}
          className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2"
        >
          <MenuIcon color="#442727" />
        </Button>
        <Directory className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`} />
      </div>
      <h1 className="motion-preset-blur-down logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest delay-700 duration-500 ease-in">
        {children}
      </h1>
      <div className="right flex items-center gap-6">
        {/* <DarkModeToggle /> */}
        <Button
          onClick={toggleSidebar}
          className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
        >
          <CartIcon width={44} height={40} color="#442727" />
        </Button>
      </div>
    </div>
  )
}

export default memo(Navbar)
