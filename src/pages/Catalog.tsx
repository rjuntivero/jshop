import { useFetchProducts } from '../hooks/useFetchProducts'
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
import Overlay from '../components/layout/Overlay'
import { CartProvider } from '../components/contexts/CartContext'

const Catalog = () => {
  const [search, setSearch] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const { data, isLoading, error } = useFetchProducts()
  const { screenWidth } = useWindowSize()

  const filteredProducts = data
    ?.filter((product) => {
      if (activeCategory === 'All') return true
      return product.category
        .toLowerCase()
        .includes(activeCategory.toLowerCase())
    })
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )

  const handleItemClick = useCallback((item: string) => {
    setActiveCategory(item)
  }, [])

  useEffect(() => {
    setShowSidebar(screenWidth > 1024)
  }, [screenWidth])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleShowSideBar = () => {
    setShowSidebar(!showSidebar)
  }

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
  }

  const gridStyles = useMemo(
    () => ({
      gridTemplateColumns: showSidebar ? '325px' : '0px',
    }),
    [showSidebar],
  )

  return (
    <>
      <Navbar
        toggleSidebar={toggleCart}
        className="border-b-bg-primary-light flex items-center justify-between border-b-3 px-8 py-4 transition-all"
      />
      <Overlay
        className={`bg-primary-light fixed inset-0 z-999 h-full w-full ease-in-out ${isCartOpen ? 'opacity-20' : 'pointer-events-none opacity-0'}`}
      />
      <CartProvider>
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
      </CartProvider>

      <Footer />
    </>
  )
}

export default Catalog
