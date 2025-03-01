import Button from '../ui/Button'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '../icons/MenuIcon'
import CartIcon from '../icons/CartIcon'
import { memo } from 'react'
import DarkModeToggle from '../ui/DarkModeToggle'

interface NavbarProps {
  children?: ReactNode
  className?: string
  toggleSidebar: () => void
}

const Navbar: React.FC<NavbarProps> = ({ className, toggleSidebar }) => {
  return (
    <div className={className}>
      <div className="left flex items-center gap-6">
        <Button className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2">
          <Link to="/">
            <MenuIcon color="#442727" />
          </Link>
        </Button>
      </div>
      <h1 className="motion-preset-blur-down logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest delay-700 duration-500 ease-in">
        J S-H-O-P
      </h1>
      <div className="right flex items-center gap-6">
        <DarkModeToggle />
        <Button
          onClick={toggleSidebar}
          className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
        >
          <CartIcon width={44} height={40} color="#442727" />
          {/* #EFDB9C */}
        </Button>
      </div>
    </div>
  )
}

export default memo(Navbar)
