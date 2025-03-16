import { useWindowSize } from '../hooks/useWindowSize'
import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/layout/Navbar'
import Searchbar from '../components/ui/Searchbar'
import Sidebar from '../components/layout/Sidebar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/layout/Footer'
import LoadWheel from '../components/ui/LoadWheel'
import ErrorMessage from '../components/ui/ErrorMessage'
import React, { useMemo } from 'react'
import CartSidebar from '../components/layout/CartSidebar'
import { useCart } from '../hooks/useCart'
import { useFilteredProducts } from '../hooks/useFilteredProducts'
import MenuIcon from '../components/icons/MenuIcon'
import Button from '../components/ui/Button'
import Directory from '../components/layout/Directory'
import CartIcon from '../components/icons/CartIcon'

const Catalog = () => {
  const [search, setSearch] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const {
    products,
    isLoading,
    error,
    isCartOpen,
    toggleCart,
    toggleDirectory,
    isDirectoryOpen,
  } = useCart()
  const { screenWidth } = useWindowSize()

  const filteredProducts = useFilteredProducts(products, search, activeCategory)

  const handleItemClick = useCallback((item: string) => {
    setActiveCategory(item)
  }, [])

  useEffect(() => {
    setShowSidebar(screenWidth > 1024)
  }, [screenWidth])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const handleShowSideBar = useCallback(() => {
    setShowSidebar(!showSidebar)
  }, [showSidebar])

  const gridStyles = useMemo(
    () => ({
      gridTemplateColumns: showSidebar ? '325px' : '0px',
    }),
    [showSidebar],
  )

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
        <h1 className="motion-preset-blur-down logo text-primary-light dark:text-secondary-dark text-center text-4xl font-bold tracking-widest delay-700 duration-500 ease-in">
          JSHOP
        </h1>
        <div className="right flex items-center gap-6">
          <Button
            onClick={toggleCart}
            className="dark:bg-secondary-light motion-translate-x-in-[-110%] motion-translate-y-in-[11%] motion-opacity-in-[33%] motion-rotate-in-[-480deg] motion-duration-[0.38s] motion-duration-[0.57s]/scale motion-delay-[0.23s]/scale motion-duration-[0.42s]/rotate motion-ease-spring-bouncier flex h-[78px] w-[78px] items-center justify-center rounded-full p-2 transition-colors"
          >
            <CartIcon width={44} height={40} color="#442727" />
          </Button>
        </div>
      </Navbar>

      <CartSidebar
        onClose={toggleCart}
        className={`bg-background-light fixed top-0 right-0 z-99999 flex h-screen w-106 flex-col p-8 transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      />
      <main
        className="relative grid h-full min-h-screen gap-x-9.5 pr-3 transition-all duration-500 md:pr-3"
        style={gridStyles}
      >
        <div
          className={`sticky top-12 row-start-2 self-start transition-transform duration-500 ${
            showSidebar ? 'lg:translate-x-0' : '-translate-x-full'
          }`}
          style={{
            width: '305px',
          }}
        >
          <Sidebar
            activeCategory={activeCategory}
            handleItemClick={handleItemClick}
          />
        </div>

        <div className="bg-background-light dark:bg-background-dark shadow-b sticky top-0 z-2 col-span-1 col-start-2 row-start-1 py-5 pr-2 pl-12">
          <Searchbar
            input={search}
            onChange={handleSearch}
            results={filteredProducts?.length || 0}
            sideBarVisible={showSidebar}
            showSidebar={handleShowSideBar}
          />
        </div>

        <div className="col-span-1 col-start-2 row-start-2 h-full transition-all duration-500">
          <article
            className={`relative flex flex-wrap gap-4 px-3 ${!showSidebar ? 'justify-center' : 'justify-start'}`}
          >
            <div className="absolute inset-x-0">
              {isLoading && <LoadWheel />}
            </div>
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
