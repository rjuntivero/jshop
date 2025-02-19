import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const ShoppingCart = ({ name = '' }) => {
  return (
    <div className="wrapper text-primary-light flex min-h-screen flex-col items-center justify-center">
      <div className="header">
        <h1 className="font-big-header text-6xl">Shopping Cart</h1>
      </div>
      <div className="links text-secondary-light flex flex-col items-center gap-4 font-bold">
        <p className="text-2xl">Your Cart is Empty...</p>
        <Link
          to={`/product/${name}`}
          className="border-primary-light rounded-full border-3 px-4 py-2"
        >
          Products
        </Link>
        <Link
          to="/"
          className="border-primary-light rounded-full border-3 px-4 py-2"
        >
          Home
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default ShoppingCart
