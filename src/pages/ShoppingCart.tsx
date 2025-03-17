import { Link } from 'react-router-dom'
import MenuIcon from '../components/icons/MenuIcon'
import Directory from '../components/layout/Directory'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'
import { useCart } from '../hooks/useCart'
import CheckoutItem from '../components/ui/CheckoutItem'
import CartIcon from '../components/icons/CartIcon'

const ShoppingCart = () => {
  const { cartItems, cartTotal, toggleDirectory, isDirectoryOpen, clearCart } =
    useCart()

  const totalItems = cartItems.reduce((total, item) => total + item.count, 0)

  return (
    <>
      <Navbar className="border-b-bg-primary-light flex items-center justify-between border-b-3 transition-all">
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
        <div className="right flex items-center gap-6">
          <Link
            to="/my-cart"
            className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
          >
            <CartIcon width={44} height={40} color="#442727" />
          </Link>
        </div>
      </Navbar>
      <main className="text-primary-light grid min-h-screen grid-cols-3 p-8">
        <article className="col-span-2 m-8 overflow-y-auto rounded-sm bg-white p-15 shadow-md">
          <div className="">
            <h1 className="font-big-header text-3xl">Shopping Cart</h1>
          </div>
          <Button onClick={clearCart}>
            {cartItems.length > 0 && (
              <h2 className="text-secondary-light mb-4 text-xl">
                Remove all items
              </h2>
            )}
          </Button>
          <div className="relative rounded-md">
            {cartItems.length > 0 ? (
              cartItems?.map((item) => (
                <CheckoutItem
                  key={String(item.id)}
                  product={item}
                  productName={item.title}
                  productPrice={item.price}
                  productType={item.category}
                  imageURL={item.image}
                  totalPrice={item.totalPrice}
                  count={item.count}
                />
              ))
            ) : (
              <>
                <h1 className="text-2xl font-bold text-black">
                  Your JSHOP cart is empty...
                </h1>
                <Link to="/products" className="text-black">
                  Your shopping cart lives to serve --- Go out there and fill it
                  with items!!
                </Link>
              </>
            )}
          </div>
          <h1 className="text-end text-xl">
            Subtotal: {`(${totalItems} items)`} <strong>${cartTotal}</strong>
          </h1>
        </article>
        <div className="p-8">
          <div className="text-secondary-light outline-secondary-light/50 rounded-sm bg-white p-8 font-bold outline-1">
            <h1 className="text-primary-light">Total:</h1>
            <hr className="w-full" />
            <h1 className="text-primary-light justify-self-end">
              {'$' + Math.round(cartTotal * 100) / 100}
            </h1>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ShoppingCart
