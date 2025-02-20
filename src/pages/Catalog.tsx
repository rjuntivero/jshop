import { Product } from '../types/Product'
import { useFetchProducts } from '../hooks/useFetchProducts'
import { useWindowSize } from '../hooks/useWindowSize'
import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Searchbar from '../components/ui/Searchbar'
import Sidebar from '../components/layout/Sidebar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/layout/Footer'
import LoadWheel from '../components/ui/LoadWheel'
import ErrorMessage from '../components/ui/ErrorMessage'

const Catalog = () => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const { data, isLoading, error, refetch } = useFetchProducts()
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

  const handleItemClick = (item: string) => {
    setActiveCategory(item)
  }

  useEffect(() => {
    if (data) setProducts(data)
  }, [data])

  useEffect(() => {
    setShowSidebar(screenWidth > 1024)
  }, [screenWidth])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleShowSideBar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <>
      <Navbar />
      <div
        className="wrapper grid h-full min-h-screen gap-x-9.5 pr-3 transition-all duration-500 md:pr-3"
        style={{
          gridTemplateColumns: showSidebar ? '325px' : '0px',
        }}
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

        <div className="bg-background-light sticky top-0 z-2 col-span-1 col-start-2 row-start-1 py-5 pr-2 pl-12">
          <Searchbar
            input={search}
            onChange={handleSearch}
            results={filteredProducts?.length || 0}
            sideBarVisible={showSidebar}
            showSidebar={handleShowSideBar}
          />
        </div>

        <div className="catalog col-span-1 col-start-2 row-start-2 h-full transition-all duration-500">
          <div
            className={`product-container flex min-h-[800px] flex-wrap gap-6 ${(filteredProducts && filteredProducts.length % 2 == 0) || isLoading ? 'justify-center' : 'justify-start'}`}
          >
            {isLoading && <LoadWheel />}
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
