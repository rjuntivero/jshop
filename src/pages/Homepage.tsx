import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import ProductCard from '../components/ProductCard'
import { useFilteredProducts } from '../hooks/useFilteredProducts'
import { useCart } from '../hooks/useCart'
import ErrorMessage from '../components/ui/ErrorMessage'

const Homepage = () => {
  const { products, isLoading, error } = useCart()
  const filteredProducts = useFilteredProducts(products, '', 'All')
  return (
    <>
      <Navbar className="flex justify-between"></Navbar>
      <div className="def-margin z-10 flex justify-around gap-5 p-5">
        <div className="text-primary-light relative z-2 flex h-80 flex-col items-center justify-center">
          <h1 className="font-big-header relative z-10 text-7xl">JSHOP</h1>
          <div className="text-secondary-light relative flex flex-col items-center gap-4 font-bold">
            <h1 className="text-primary-light relative z-10">
              All the right styles for you
            </h1>
            <div className="bg-secondary-light/50 absolute -top-40 -left-50 z-0 hidden h-60 w-60 rounded-full md:block"></div>
            <div className="bg-primary-light/50 absolute -top-20 -right-40 z-0 hidden h-40 w-40 rounded-full md:block"></div>
            <div className="bg-secondary-light/50 absolute top-10 left-20 z-0 hidden h-20 w-20 rounded-full md:block"></div>
            <div className="bg-primary-light absolute top-10 -left-18 z-0 hidden h-15 w-15 rounded-full md:block"></div>
            <div className="bg-primary-light absolute top-25 -left-20 z-0 hidden h-5 w-5 rounded-full md:block"></div>

            <Link
              to="products"
              className="hover:bg-secondary-light hover:text-primary-light bg-primary-light relative z-10 rounded-full px-4 py-2 transition-all duration-400"
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
        <div className="bg-secondary-light/50 outline-primary-light mt-3 flex gap-4 overflow-auto rounded-sm p-5 outline-2">
          {error && <ErrorMessage />}
          {!isLoading &&
            !error &&
            filteredProducts
              ?.slice(0, 4)
              ?.map((product) => (
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
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Homepage
