import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Searchbar from '../components/ui/Searchbar'
import Sidebar from '../components/layout/Sidebar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/layout/Footer'

const Catalog = () => {
  return (
    <>
      <Navbar />
      <div className="wrapper grid h-full min-h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr] gap-x-9.5 pr-8">
        <div className="sticky top-12 row-start-2 self-start">
          <Sidebar />
        </div>

        <div className="bg-background-light sticky top-0 col-span-1 col-start-2 row-start-1 py-5 pr-8 pl-2">
          <Searchbar />
        </div>

        <div className="catalog col-span-1 col-start-2 row-start-2 h-full">
          <div className="product-container grid grid-cols-4 gap-4 p-5">
            {Array.from({ length: 20 }).map((_, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Catalog
