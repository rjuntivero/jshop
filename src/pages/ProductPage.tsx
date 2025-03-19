import { Link, useParams } from 'react-router-dom'
import { useFetchProduct } from '../hooks/useFetchProduct'
import Navbar from '../components/layout/Navbar'
import LoadWheel from '../components/ui/LoadWheel'
import Button from '../components/ui/Button'
import MenuIcon from '../components/icons/MenuIcon'
import Directory from '../components/layout/Directory'
import CartIcon from '../components/icons/CartIcon'
import { useCart } from '../hooks/useCart'
import CartSidebar from '../components/layout/CartSidebar'
import Footer from '../components/layout/Footer'
import { Product } from '../types/Product'
import ErrorMessage from '../components/ui/ErrorMessage'

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, error } = useFetchProduct(Number(id))
  const {
    toggleDirectory,
    isDirectoryOpen,
    toggleCart,
    isCartOpen,
    addToCart,
  } = useCart()
  return (
    <>
      <Navbar className="mb-8 flex items-center justify-between border-b-3">
        <div className="left flex items-center gap-6">
          <Button
            onClick={toggleDirectory}
            className="dark:bg-primary-dark navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2"
          >
            <MenuIcon color="#442727" />
          </Button>
          <Directory
            className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`}
          />
        </div>
        <h1 className="logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest">
          JSHOP
        </h1>
        <div className="right flex items-center gap-6">
          <Button
            onClick={toggleCart}
            className="d flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
          >
            <CartIcon width={44} height={40} color="#442727" />
          </Button>
        </div>
      </Navbar>

      <CartSidebar
        onClose={toggleCart}
        className={`bg-background-light fixed top-0 right-0 z-99999 flex h-screen w-106 flex-col p-8 transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      />
      {isLoading && (
        <div className="flex h-[600px] items-center justify-center">
          <LoadWheel />
        </div>
      )}
      {error && <ErrorMessage />}

      {product && (
        <main className="text-primary-light relative flex w-full flex-col justify-center px-48">
          <div className="box-border flex w-full gap-3 rounded-t-md border-5 bg-white py-12">
            <img
              className="h-[352px] w-[352px] object-contain object-center p-8"
              src={product?.image}
              alt={`image of ${product?.title}`}
            />
            <div className="def-padding pl-0!">
              <div className="text-3xl">
                <h1 className="font-sub-header">{product?.title}</h1>
                <h1 className="text-secondary-light text-lg">
                  {product?.category}
                </h1>
              </div>
              <h1 className="font-sub-header !pb-0">About this item</h1>
              <h1 className="pt-1!">{product?.description}</h1>
              <div className="flex items-center justify-start">
                <h1 className="def-padding pl-0! text-3xl font-bold">{`$${product?.price}`}</h1>
                <Button
                  className="bg-secondary-light border-primary-light add-to-cart flex items-center justify-end gap-4 justify-self-start rounded-full border-2 p-2 md:col-start-3 md:justify-self-center"
                  onClick={() => addToCart(product as Product)}
                >
                  <h1 className="font-sub-header">Add To Cart</h1>
                  <CartIcon width={28} height={28} color="#442727" />
                </Button>
              </div>
              <div>
                <Link className="" to="/products">
                  <h1 className="font-sub-header hover:text-secondary-light cursor-pointer pt-12 text-end text-sm">
                    Back to Products...
                  </h1>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-primary-light def-padding mt-1 h-4 w-full rounded-b-md shadow-md"></div>
        </main>
      )}

      <Footer />
    </>
  )
}

export default ProductPage
