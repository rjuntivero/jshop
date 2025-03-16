import MenuIcon from '../components/icons/MenuIcon'
import Directory from '../components/layout/Directory'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import ProductCard from '../components/ProductCard'
import Button from '../components/ui/Button'
import CartItem from '../components/ui/CartItem'
import { useCart } from '../hooks/useCart'

const ShoppingCart = () => {
  const { cartItems, cartTotal, toggleDirectory, isDirectoryOpen } = useCart()

  return (
    <>
      <Navbar className="border-b-bg-primary-light flex items-center justify-between transition-all">
        <div className="left flex items-center gap-6">
          <Button
            onClick={toggleDirectory}
            className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2"
          >
            <MenuIcon color="#442727" />
          </Button>
          <Directory
            className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`}
          />
        </div>
        <div className="right flex items-center gap-6"></div>
      </Navbar>
      <main className="text-primary-light m-4 flex min-h-screen items-center justify-center gap-8">
        <div className="flex max-h-[600px] flex-col overflow-y-auto rounded-md bg-white p-8">
          <div className="">
            <h1 className="font-big-header self-start text-4xl">
              Shopping Cart
            </h1>
          </div>
          <div className="">
            {cartItems.length > 0
              ? cartItems?.map((item) => (
                  <CartItem
                    product={item}
                    productName={item.title}
                    productPrice={item.price}
                    productType={item.category}
                    imageURL={item.image}
                    totalPrice={item.totalPrice}
                  />
                ))
              : 'Your cart is empty...'}
          </div>
        </div>
        <div className="text-secondary-light flex flex-col items-center gap-4 rounded-sm bg-white p-8 font-bold">
          <h1>Total:</h1>
          <h1>{`${cartTotal > 0 ? '$' : ''}` + cartTotal}</h1>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ShoppingCart
