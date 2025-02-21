import Button from '../ui/Button'
import React, { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '../icons/MenuIcon'
import CartIcon from '../icons/CartIcon'
import { memo } from 'react'
import DarkModeToggle from '../ui/DarkModeToggle'
import CartSidebar from './CartSidebar'
import Overlay from './Overlay'

interface NavbarProps {
  children?: ReactNode
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setisSidebarOpen((prev) => !prev)
  }

  return (
    <div className="border-b-bg-primary-light mb-8 flex items-center justify-between border-b-3 px-8 py-4 transition-all">
      <div className="left flex items-center gap-6">
        <Button className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier bg-primary-light navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2">
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
        <Button
          onClick={toggleSidebar}
          className="bg-primary-light dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
        >
          <CartIcon width={44} height={40} color="#EFDB9C" />
        </Button>
      </div>
      <CartSidebar
        onClose={toggleSidebar}
        className={`bg-background-light fixed top-0 right-0 z-99999 flex h-screen w-106 flex-col p-8 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      />
      <Overlay
        className={`bg-primary-light absolute inset-0 z-999 h-full w-full ease-in-out ${isSidebarOpen ? 'opacity-20' : 'pointer-events-none opacity-0'}`}
      />
    </div>
  )
}

export default memo(Navbar)
