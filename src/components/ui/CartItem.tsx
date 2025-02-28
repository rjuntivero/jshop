import { memo } from 'react'
import Button from './Button'

interface T {
  productName?: string
  productType?: string
  imageURL?: string
}

const CartItem: React.FC<T> = ({ productName, productType, imageURL }) => {
  return (
    <div className="motion-preset-blur-down bg-primary-light/20 z-1 mb-2 flex h-auto w-full self-center rounded-sm duration-400">
      <div className="w-full grow rounded-lg p-6">
        <div className="pb-2">
          <img
            className="outline-primary-light h-[100px] w-full rounded-sm object-cover object-top outline-2"
            src={imageURL}
            alt="Product Image"
          />
        </div>
        <div>
          <h1 className="-mb-2 text-xl">{productName}</h1>
        </div>
        <div className="text-secondary-light font-main pb-2">
          <h2>{productType}</h2>
        </div>
        <div className="bg-primary-light flex rounded-sm p-2 text-white">
          <Button className="mx-auto">- 1 +</Button>
        </div>
      </div>
    </div>
  )
}

export default memo(CartItem)
