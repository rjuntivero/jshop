import Button from '../ui/Button'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SunIcon from '../icons/SunIcon'
import MenuIcon from '../icons/MenuIcon'
import CartIcon from '../icons/CartIcon'

interface NavbarProps {
  children?: ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between p-8">
      <div className="left flex items-center gap-6">
        <Button className="bg-primary-light navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 shadow-md shadow-[rgba(0,0,0,0.3)]">
          <Link to="/">
            <MenuIcon />
          </Link>
        </Button>
      </div>
      <h1 className="logo text-primary-light text-center text-4xl font-bold tracking-widest">
        J S-H-O-P
      </h1>
      <div className="right flex items-center gap-6">
        {/* <Button className="bg-primary-light flex h-[78px] w-[78px] items-center justify-center rounded-full p-2">
          <SunIcon />
        </Button> */}
        <Button className="bg-primary-light navbar-btn shadow-[rgba(0,0,0,0.3) flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 shadow-md">
          <Link to="/my-cart">
            <CartIcon width={44} height={40} color="#EFDB9C" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Navbar
