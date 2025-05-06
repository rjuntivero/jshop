// import { useWindowSize } from '../hooks/useWindowSize'
import { useState, useCallback } from 'react'
import Navbar from '../components/layout/Navbar'
import Searchbar from '../components/ui/Searchbar'
import Sidebar from '../components/layout/Sidebar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/layout/Footer'
import LoadWheel from '../components/ui/LoadWheel'
import ErrorMessage from '../components/ui/ErrorMessage'
import React from 'react'
import CartSidebar from '../components/layout/CartSidebar'
import { useFilteredProducts } from '../hooks/useFilteredProducts'
import MenuIcon from '../components/icons/MenuIcon'
import Button from '../components/ui/Button'
import Directory from '../components/layout/Directory'
import CartIcon from '../components/icons/CartIcon'
import { useAppSelector } from '../app/hooks'
import { useDispatch } from 'react-redux'
import { toggleCart, toggleDirectory } from '../features/cartSlice'
import { useFetchProducts } from '../hooks/useFetchProducts'

const Catalog = () => {
  const [search, setSearch] = useState('')
  // const { screenWidth } = useWindowSize()
  // const [showSidebar, setShowSidebar] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const isDirectoryOpen = useAppSelector((state) => state.cart.isDirectoryOpen)
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen)
  const dispatch = useDispatch()
  const { data: products, isLoading, error } = useFetchProducts()

  const filteredProducts = useFilteredProducts(products, search, activeCategory)

  const handleDirectoryToggle = useCallback(() => {
    dispatch(toggleDirectory())
  }, [dispatch])

  const handleCartToggle = useCallback(() => {
    dispatch(toggleCart())
  }, [dispatch])

  const handleItemClick = useCallback((item: string) => {
    setActiveCategory(item)
  }, [])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  return (
    <>
      <Navbar className="border-b-bg-primary-light flex items-center justify-between border-b-3 transition-all">
        <div className="left flex items-center gap-6">
          <Button
            onClick={handleDirectoryToggle}
            className="dark:bg-primary-dark motion-scale-in-[0.5] motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier navbar-btn flex h-[78px] w-[78px] items-center justify-center rounded-full p-2"
          >
            <MenuIcon color="#442727" />
          </Button>
          <Directory
            className={`${isDirectoryOpen ? 'left-0' : '-left-full'}`}
          />
        </div>
        <h1 className="motion-preset-blur-down logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest delay-700 duration-500 ease-in">
          JSHOP
        </h1>
        <div className="right flex items-center gap-6">
          <Button
            onClick={handleCartToggle}
            className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
          >
            <CartIcon width={44} height={40} color="#442727" />
          </Button>
        </div>
      </Navbar>

      <CartSidebar
        onClose={handleCartToggle}
        className={`bg-background-light fixed top-0 right-0 z-99999 flex h-screen w-106 flex-col p-8 transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      />
      <main className="relative grid h-full min-h-screen grid-cols-1 gap-x-2 transition-all duration-500 md:grid-cols-1 lg:grid-cols-[325px_1fr]">
        <aside
          className={`sticky top-12 row-start-2 self-start transition-transform duration-500`}
          style={{
            width: '305px',
          }}
        >
          <Sidebar
            activeCategory={activeCategory}
            handleItemClick={handleItemClick}
            className="hidden lg:block"
          />
        </aside>
        <div className="bg-background-light dark:bg-background-dark shadow-b sticky top-0 z-2 col-span-1 col-start-2 row-start-1 px-3 py-3 md:px-12 md:py-5">
          <Searchbar
            input={search}
            onChange={handleSearch}
            results={filteredProducts?.length || 0}
          />
        </div>
        <div className="col-span-1 col-start-2 row-start-2 h-full transition-all duration-500">
          {isLoading && (
            <div className="flex w-full items-center justify-center">
              <LoadWheel />
            </div>
          )}
          <article className="relative grid grid-cols-2 gap-2 px-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
            {error && <ErrorMessage />}
            {!isLoading &&
              !error &&
              filteredProducts?.map((product) => (
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
              ))}
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Catalog
