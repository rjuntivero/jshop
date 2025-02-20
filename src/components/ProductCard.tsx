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
      <Button>
        <img
          className="h-[172px] w-[172px] rounded-2xl object-cover object-top shadow-lg md:h-[282px] md:w-[252px]"
          src={imageURL}
          alt="PRODUCT IMAGE"
        />
      </Button>
      <div className="product-details grid-cols-[1fr, auto] grid-rows-[auto, auto] grid p-3">
        <h1 className="font-sub-header w-30 truncate text-xl">{productName}</h1>
        <h2 className="text-1 text-secondary-light row-start-2">
          {productType}
        </h2>
        <Button className="bg-secondary-light border-primary-light add-to-cart col-start-2 row-span-2 flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 p-2">
          <CartIcon width={28} height={28} color="#442727" />
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
