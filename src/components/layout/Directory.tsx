import { Link, useLocation } from 'react-router-dom'
import CloseIcon from '../icons/CloseIcon'
import Button from '../ui/Button'
import { useCart } from '../../hooks/useCart'
import Overlay from './Overlay'

type DirectoryProps = {
  className: string
}

const Directory: React.FC<DirectoryProps> = ({ className }) => {
  const { toggleDirectory, isDirectoryOpen } = useCart()
  const location = useLocation()

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'text-secondary-light border-b-2'
      : 'hover:text-secondary-light hover:border-b-2'
  }

  return (
    <>
      <aside
        className={
          className +
          ' bg-background-light fixed top-0 z-1000 h-full w-[300px] p-8 transition-all duration-400'
        }
      >
        <Button onClick={toggleDirectory} className="flex w-full justify-end">
          <CloseIcon width={43} height={43} color="#4D2C2C" />
        </Button>
        <div className="font-big-header text-primary-light flex h-full items-center justify-center pt-6 text-2xl">
          <div className="flex flex-col gap-20">
            <h1>
              <Link
                to="/"
                className={getLinkClass('/')}
                onClick={toggleDirectory}
              >
                Home
              </Link>
            </h1>
            <h1>
              <Link
                to="/products"
                className={getLinkClass('/products')}
                onClick={toggleDirectory}
              >
                Products
              </Link>
            </h1>
            <h1>
              <Link
                to="/my-cart"
                className={getLinkClass('/my-cart')}
                onClick={toggleDirectory}
              >
                Cart
              </Link>
            </h1>
          </div>
        </div>
      </aside>
      <Overlay
        className={`bg-primary-light fixed inset-0 z-999 h-full w-full transition-all duration-400 ease-in-out ${isDirectoryOpen ? 'opacity-20' : 'pointer-events-none opacity-0'}`}
      />
    </>
  )
}

export default Directory
