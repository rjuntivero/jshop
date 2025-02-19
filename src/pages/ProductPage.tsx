import { Link } from 'react-router-dom'

const ProductPage = () => {
  return (
    <>
      <h1>Welcome to the Product Page!</h1>
      <Link to="/">Click here to go home!</Link>
      <Link to="/my-cart">Click here to see your cart!</Link>
    </>
  )
}

export default ProductPage
