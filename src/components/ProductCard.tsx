import { memo, useContext } from 'react'
import CartIcon from './icons/CartIcon'
import Button from './ui/Button'
import { Link } from 'react-router-dom'
import { Product } from '../types/Product'
import { useCart } from './contexts/CartContext'

interface T {
  product?: Product
  productName?: string
  productType?: string
  imageURL?: string
}

const ProductCard: React.FC<T> = ({
  product,
  productName,
  productType,
  imageURL,
}) => {
  const { addToCart } = useCart()
  return (
    <div className="motion-preset-blur-down bg-primary-light/20 z-1 h-auto w-[353px] rounded-sm duration-400">
      <div className="grid-rows-[auto, auto] mlg:grid-cols-[repeat(3,84px)] grid items-center p-3">
        <Link className="col-span-3 pb-3" to="product">
          <img
            className="col-start-1 row-start-1 w-full justify-self-center rounded-lg object-cover object-top transition-all duration-700 hover:-translate-y-1 hover:scale-102 hover:drop-shadow-lg md:h-[252px] lg:w-[252px]"
            src={imageURL}
            alt="PRODUCT IMAGE"
          />
        </Link>
        <h1 className="font-sub-header text-primary-light dark:text-secondary-dark col-span-3 row-start-2 ml-3 truncate text-sm md:col-span-2 md:text-xl">
          {productName}
        </h1>
        <h2 className="motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-3 col-start-1 row-start-3 ml-3 w-30 text-[0.60rem] text-black md:col-span-1 md:text-sm">
          {productType}
        </h2>
        <Button
          className="bg-secondary-light border-primary-light add-to-cart col-span-3 row-start-4 flex h-[50px] w-[50px] justify-end justify-self-center rounded-full border-2 p-2 not-visited:items-center md:col-span-1 md:col-start-3 md:row-span-2 md:row-start-2 md:items-end"
          onClick={() => addToCart(product as Product)}
        >
          <CartIcon width={28} height={28} color="#442727" />
        </Button>
      </div>
    </div>
  )
}

export default memo(ProductCard)
