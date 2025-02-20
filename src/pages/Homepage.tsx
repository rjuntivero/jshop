import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const Homepage = () => {
  return (
    <>
      <div className="hero text-primary-light mx-auto flex min-h-screen flex-col items-center justify-center">
        <div className="hero-text">
          <h1 className="font-big-header text-6xl">JSHOP</h1>
        </div>
        <div className="hero-links text-secondary-light flex flex-col items-center gap-4 font-bold">
          <Link
            to="products"
            className="border-primary-light rounded-full border-3 px-4 py-2"
          >
            Shop Now
          </Link>
          <Link
            to="my-cart"
            className="border-primary-light rounded-full border-3 px-4 py-2"
          >
            My Cart
          </Link>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Homepage
