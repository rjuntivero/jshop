import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Searchbar from '../components/ui/Searchbar'
import Sidebar from '../components/layout/Sidebar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/layout/Footer'
import LoadIcon from '../components/icons/LoadIcon'

const Catalog = () => {
  interface Product {
    id: Number
    title: string
    category: string
    image: string
  }

  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const response = await fetch('https://fakestoreapi.com/products')
    return response.json()
  }

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  useEffect(() => {
    if (data) setProducts(data)
  }, [data])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div
        className="wrapper grid h-full min-h-screen gap-x-9.5 pr-3 md:pr-3"
        style={{
          gridTemplateColumns:
            'minmax(325px, 325px) minmax(600px, clamp(600px, 100%, 1200px))',
        }}
      >
        <div className="sticky top-12 row-start-2 hidden self-start lg:block">
          <Sidebar />
        </div>

        <div className="bg-background-light sticky top-0 z-2 col-span-1 col-start-2 row-start-1 py-5 pr-2 pl-2">
          <Searchbar
            input={search}
            onChange={handleSearch}
            results={products.length}
          />
        </div>

        <div className="catalog col-span-1 row-start-2 h-full transition-all duration-500">
          <div className="product-container flex min-h-[800px] flex-wrap justify-center gap-6">
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="font-big-header text-primary-light flex justify-center text-2xl">
                  Loading Products
                </p>
                <LoadIcon />
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center">
                <p className="font-big-header text-primary-light flex justify-center text-2xl">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}
            {!isLoading &&
              !error &&
              products.map((product) => (
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
