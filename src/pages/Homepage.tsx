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
      <div className="def-margin flex justify-around gap-5 p-5">
        <div className="text-primary-light flex h-80 flex-col items-center justify-center">
          <h1 className="font-big-header text-7xl">JSHOP</h1>
          <div className="text-secondary-light flex flex-col items-center gap-4 font-bold">
            <h1 className="text-primary-light">All the right styles for you</h1>
            <Link
              to="products"
              className="hover:bg-secondary-light hover:text-primary-light bg-primary-light rounded-full px-4 py-2 transition-all"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="self-center">
          <img className="h-80 object-cover" src="" alt="" />
        </div>
      </div>

      <div className="def-margin">
        <h1 className="font-bold">New Arrivals</h1>
        <div className="flex gap-4 overflow-auto pt-3">
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
