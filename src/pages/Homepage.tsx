import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import ProductCard from '../components/ProductCard'
import { useFilteredProducts } from '../hooks/useFilteredProducts'
import { useCart } from '../hooks/useCart'
import ErrorMessage from '../components/ui/ErrorMessage'
import Button from '../components/ui/Button'
import MenuIcon from '../components/icons/MenuIcon'
import Directory from '../components/layout/Directory'
import CartIcon from '../components/icons/CartIcon'
import LoadWheel from '../components/ui/LoadWheel'

const Homepage = () => {
  const { products, isLoading, error, isDirectoryOpen, toggleDirectory } =
    useCart()
  const filteredProducts = useFilteredProducts(products, '', 'All')
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
        <div className="right flex items-center gap-6">
          <Link
            to="/my-cart"
            className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
          >
            <CartIcon width={44} height={40} color="#442727" />
          </Link>
        </div>
      </Navbar>
      <div className="def-margin z-10 flex justify-around gap-5 p-5">
        <div className="text-primary-light relative z-2 flex h-80 flex-col items-center justify-center">
          <h1 className="font-big-header -motion-translate-y-in-25 motion-preset-focus-md relative z-10 text-[clamp(2rem,15vw,4.5rem)] transition-all delay-300 duration-1200 ease-in-out">
            JSHOP
          </h1>
          <div className="text-secondary-light relative flex flex-col items-center gap-4 font-bold transition-all duration-800">
            <h1 className="text-primary-light motion-preset-slide-left relative z-10 transition-all delay-1200 duration-1000">
              All the right styles for you
            </h1>
            <div className="bg-secondary-light/50 motion-opacity-loop-70 absolute -top-40 -left-50 z-0 hidden h-60 w-60 rounded-full transition-all delay-400 duration-3500 ease-in-out md:block"></div>
            <div className="bg-primary-light/50 motion-opacity-loop-50 absolute -top-20 -right-40 z-0 hidden h-40 w-40 rounded-full transition-all delay-2000 duration-3500 ease-in-out md:block"></div>
            <div className="bg-secondary-light/30 motion-opacity-loop-60 absolute top-10 left-20 z-0 hidden h-20 w-20 rounded-full transition-all delay-1000 duration-3500 ease-in-out md:block"></div>
            <div className="bg-primary-light motion-opacity-loop-40 absolute top-10 -left-18 z-0 hidden h-15 w-15 rounded-full transition-all delay-2500 duration-3500 ease-in-out md:block"></div>
            <div className="bg-primary-light motion-opacity-loop-20 absolute top-25 -left-20 z-0 hidden h-5 w-5 rounded-full transition-all delay-1100 duration-4500 ease-in-out md:block"></div>

            <Link
              to="products"
              className="motion-preset-expand bg-primary-light hover:bg-secondary-light hover:text-primary-light relative z-10 rounded-full px-4 py-2 transition-all duration-400 ease-out"
            >
              Shop Now
            </Link>
          </div>
        </div>
        {/* <div className="self-center">
          <img className="h-80 object-cover" src="" alt="" />
        </div> */}
      </div>

      <div className="def-margin">
        <h1 className="font-bold">New Arrivals</h1>
        <article className="bg-secondary-light/50 outline-primary-light mt-3 box-border flex h-auto min-h-[250px] gap-4 overflow-auto rounded-sm p-2 outline-2 md:p-5 lg:min-h-[530px]">
          {isLoading && (
            <div className="flex w-full items-center justify-center">
              {' '}
              <LoadWheel />
            </div>
          )}
          {error && <ErrorMessage />}
          {!isLoading &&
            !error &&
            filteredProducts?.slice(0, 4)?.map((product) => (
              <div
                className="w-full flex-none sm:w-1/2 md:w-1/3 lg:w-1/4"
                key={String(product.id)}
              >
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  productName={product.title}
                  productType={
                    product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)
                  }
                  imageURL={product.image}
                  productPrice={product.price}
                />
              </div>
            ))}
        </article>
      </div>
      <Footer />
    </>
  )
}

export default Homepage
