import { memo } from 'react'
import CartIcon from './icons/CartIcon'
import Button from './ui/Button'

interface T {
  productName?: string
  productType?: string
  imageURL?: string
}

const ProductCard: React.FC<T> = ({ productName, productType, imageURL }) => {
  return (
    <div className="motion-preset-blur-down z-1 h-[346px] w-[253px] duration-400">
      <main className="grid-rows-[auto, auto] grid grid-cols-[repeat(3,84px)] p-3">
        <Button className="col-span-3 pb-3">
          <img
            className="col-start-1 row-start-1 h-[172px] w-[172px] rounded-2xl object-cover object-top shadow-lg md:h-[282px] md:w-[252px]"
            src={imageURL}
            alt="PRODUCT IMAGE"
          />
        </Button>
        <h1 className="font-sub-header text-primary-light dark:text-secondary-dark col-span-2 row-start-2 ml-3 truncate text-xl">
          {productName}
        </h1>
        <h2 className="text-secondary-light motion-scale-in-[0.1] motion-translate-x-in-[-84%] motion-translate-y-in-[-5%] motion-blur-in-[1px] motion-duration-[0.48s]/scale motion-duration-[0.62s]/translate motion-duration-[0.37s]/blur col-span-2 col-start-1 row-start-3 ml-3 w-30 text-sm">
          {productType}
        </h2>
        <Button className="bg-secondary-light border-primary-light add-to-cart col-start-3 row-span-2 row-start-2 ml-auto flex h-[50px] w-[50px] items-end justify-end rounded-full border-2 p-2">
          <CartIcon width={28} height={28} color="#442727" />
        </Button>
      </main>
    </div>
  )
}

export default memo(ProductCard)
