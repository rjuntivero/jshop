import { memo } from 'react'
import CartIcon from './icons/CartIcon'
import Button from './ui/Button'
import { Link } from 'react-router-dom'
import { Product } from '../types/Product'
import { useCart } from '../hooks/useCart'

interface T {
  product?: Product
  productName?: string
  productType?: string
  productPrice?: number
  imageURL?: string
}

const ProductCard: React.FC<T> = ({
  product,
  productName,
  productType,
  productPrice,
  imageURL,
}) => {
  const { addToCart } = useCart()
  return (
    <div className="motion-preset-blur-down z-1 h-auto w-[343px] rounded-sm bg-white shadow-md duration-400">
      <div className="grid-rows-[auto, auto] grid grid-cols-[auto,auto] items-center p-3 md:grid-cols-[repeat(3,1fr)]">
        <Link
          className="col-span-3 h-[clamp(100px,23vh,252px)] w-full pb-3"
          to={`/product/${product?.id}`}
        >
          <img
            className="col-start-1 row-start-1 h-[clamp(100px,23vh,252px)] w-[clamp(100px,10vw,252px)] justify-self-center rounded-lg object-contain object-top transition-all duration-700 hover:-translate-y-1 hover:scale-102"
            src={imageURL}
            alt="PRODUCT IMAGE"
          />
        </Link>
        <h1 className="font-sub-header text-primary-light dark:text-secondary-dark col-span-1 row-start-2 ml-3 truncate text-sm md:col-span-3 md:text-xl">
          {productName}
        </h1>
        <h2 className="motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-3 col-start-1 row-start-3 ml-3 w-30 text-[0.60rem] text-black md:col-span-1 md:text-sm">
          {productType}
        </h2>
        <h2 className="font-main *:motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-3 col-start-1 row-start-4 ml-3 w-30 pt-1 text-[0.60rem] font-semibold text-black md:col-span-1 md:text-[1.8rem]">
          {'$' + productPrice}
        </h2>
        <Button
          className="bg-secondary-light border-primary-light add-to-cart col-start-2 row-start-4 flex h-[50px] w-[50px] justify-end justify-self-start rounded-full border-2 p-2 md:col-start-3 md:justify-self-center"
          onClick={() => addToCart(product as Product)}
        >
          <CartIcon width={28} height={28} color="#442727" />
        </Button>
      </div>
    </div>
  )
}

export default memo(ProductCard)
