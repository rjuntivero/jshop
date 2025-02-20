import Button from '../ui/Button'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '../icons/MenuIcon'
import CartIcon from '../icons/CartIcon'
import { memo } from 'react'
import DarkModeToggle from '../ui/DarkModeToggle'

interface NavbarProps {
  children?: ReactNode
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <div className="left flex items-center gap-6">
        <Button className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier bg-primary-light navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 shadow-md shadow-[rgba(0,0,0,0.3)]">
          <Link to="/">
            <MenuIcon />
          </Link>
        </Button>
      </div>
      <h1 className="logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest">
        J S-H-O-P
      </h1>
      <div className="right flex items-center gap-6">
        <DarkModeToggle />
        <Button className="bg-primary-light dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors">
          <Link to="/my-cart">
            <CartIcon width={44} height={40} color="#EFDB9C" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default memo(Navbar)
