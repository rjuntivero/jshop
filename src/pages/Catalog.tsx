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

const Catalog = () => {
  const [search, setSearch] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
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

  const gridStyles = useMemo(
    () => ({
      gridTemplateColumns: showSidebar ? '325px' : '0px',
    }),
    [showSidebar],
  )

  return (
    <>
      <Navbar />
      <main
        className="grid h-full min-h-screen gap-x-9.5 pr-3 transition-all duration-500 md:pr-3"
        style={gridStyles}
      >
        <div
          className={`sticky top-12 row-start-2 self-start transition-transform duration-500 ${
            showSidebar ? 'lg:translate-x-0' : '-translate-x-full'
          }`}
          style={{
            width: '325px',
          }}
        >
          <Sidebar
            activeCategory={activeCategory}
            handleItemClick={handleItemClick}
          />
        </div>

        <div className="bg-background-light dark:bg-background-dark sticky top-0 z-2 col-span-1 col-start-2 row-start-1 py-5 pr-2 pl-12">
          <Searchbar
            input={search}
            onChange={handleSearch}
            results={filteredProducts?.length || 0}
            sideBarVisible={showSidebar}
            showSidebar={handleShowSideBar}
          />
        </div>

        <div className="col-span-1 col-start-2 row-start-2 h-full transition-all duration-500">
          <article className="relative flex min-h-[800px] flex-1 flex-wrap justify-start gap-6 px-3">
            <div className="absolute inset-x-0 inset-y-[50%]">
              {isLoading && <LoadWheel />}
            </div>
            {error && <ErrorMessage />}
            {!isLoading &&
              !error &&
              filteredProducts?.map((product) => (
                <ProductCard
                  key={String(product.id)}
                  productName={product.title}
                  productType={
                    product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)
                  }
                  imageURL={product.image}
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
