import { memo } from 'react'
import CartIcon from './icons/CartIcon'
import Button from './ui/Button'
import { Link } from 'react-router-dom'
import { Product } from '../types/Product'
import { addToCart } from '../features/cartSlice'
import MenuIcon from './icons/MenuIcon'
import { useAppDispatch } from '../app/hooks'

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
  const dispatch = useAppDispatch()

  return (
    <div className="motion-preset-blur-down z-1 flex h-auto grow flex-col rounded-sm bg-white shadow-md duration-400">
      <div className="p-1 md:p-3">
        <div className="relative col-span-3 h-[clamp(50px,20vh,252px)] w-full pb-1 sm:h-[clamp(50px,15vh,252px)] md:h-[clamp(50px,25vh,252px)] lg:h-[clamp(50px,40vh,352px)]">
          <img
            className="h-[clamp(50px,20vh,252px)] w-full rounded-lg object-contain object-center transition-all duration-700 group-hover:scale-102 sm:h-[clamp(50px,15vh,252px)] md:h-[clamp(50px,25vh,252px)] lg:h-[clamp(50px,40vh,352px)]"
            src={imageURL}
            alt="PRODUCT IMAGE"
          />

          <div className="font-sub-header absolute top-0 -right-5 flex w-[min-content] flex-col items-end justify-center gap-3 p-3">
            <Button
              className="group bg-primary-light/90 hover:bg-primary-light text-secondary-light flex w-[min-content] items-center justify-center rounded-l-full border-1 border-white p-2 px-2 antialiased shadow-lg transition-all duration-300 ease-in-out hover:w-[max-content] hover:px-4"
              onClick={() => dispatch(addToCart(product as Product))}
            >
              <span className="mr-2 hidden items-center group-hover:inline-block">
                Add to Cart
              </span>
              <CartIcon width={20} height={20} color="#d0a473" />
            </Button>
            {/* 442727 */}
            <Link to={`/product/${product?.id}`}>
              <Button className="group bg-secondary-light/90 hover:bg-secondary-light flex w-[min-content] items-center justify-center rounded-l-full border-1 p-2 px-2 text-white antialiased shadow-lg transition-all duration-300 ease-in-out hover:w-[max-content] hover:border-white hover:px-4">
                <span className="mr-2 hidden group-hover:inline-block">
                  See Details
                </span>
                <MenuIcon width={'20'} height={'20'} color="white" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="col-span-3 col-start-1 row-start-2 flex flex-col">
          <h1 className="font-sub-header text-primary-light dark:text-secondary-dark ml-3 truncate pt-3 text-sm md:col-span-3 md:text-xl">
            {productName}
          </h1>
          <h2 className="motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-3 col-start-1 row-start-3 ml-3 w-30 text-[0.60rem] text-black md:col-span-1 md:text-sm">
            {productType}
          </h2>
        </div>

        <h2 className="font-main antialised motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-3 col-start-1 row-start-4 ml-3 w-30 pt-1 text-[0.60rem] font-semibold text-black md:col-span-1 md:text-[1.8rem]">
          {'$' + productPrice?.toFixed(2)}
        </h2>
      </div>
    </div>
  )
}

export default memo(ProductCard)
