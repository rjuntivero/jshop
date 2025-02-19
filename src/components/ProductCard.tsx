import CartIcon from './icons/CartIcon'
import Button from './ui/Button'

const ProductCard = () => {
  return (
    <div className="h-[346px] w-[253px]">
      <div className="product-image">
        <img
          className="h-[282px] w-[252px] rounded-2xl object-cover shadow-lg"
          src="../../public/images/mock.jpg"
          alt="PRODUCT IMAGE"
        />
      </div>
      <div className="product-details grid-cols-[1fr, auto] grid-rows-[auto, auto] grid p-3">
        <h1 className="font-sub-header text-xl">Product Name</h1>
        <h2 className="text-1 text-secondary-light row-start-2">
          Product Type
        </h2>
        <Button className="bg-secondary-light border-primary-light col-start-2 row-span-2 flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 p-2">
          <CartIcon width={28} height={28} color="#442727" />
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
