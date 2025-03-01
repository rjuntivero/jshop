import { memo } from 'react'
import Button from './Button'
import { Product } from '../../types/Product'
import { useCart } from '../contexts/CartContext'

interface T {
  product?: Product
  productName?: string
  productPrice?: number
  totalPrice?: number
  imageURL?: string
  count?: number
}

const CartItem: React.FC<T> = ({
  product,
  productName,
  totalPrice,
  imageURL,
  count,
}) => {
  const { addToCart, removeFromCart } = useCart()
  return (
    <div className="motion-preset-blur-down bg-primary-light/20 z-1 mb-3 flex h-auto w-full self-center rounded-sm duration-400">
      <div className="grow rounded-lg p-6">
        <div className="pb-2">
          <img
            className="outline-primary-light h-[100px] w-full rounded-sm object-cover object-top outline-2"
            src={imageURL}
            alt="Product Image"
          />
        </div>
        <div>
          <h1 className="text-md font-main mb-2">{productName}</h1>
        </div>
        <div className="font-main pb-2 text-[1.5rem] font-semibold">
          <h2>{'$' + totalPrice}</h2>
        </div>
        <div className="flex items-center justify-between rounded-sm bg-white/30 text-xl">
          <Button
            onClick={() => removeFromCart(product?.id as number)}
            className="hover:bg-primary-light/20 self-center px-4 py-2 transition duration-400"
          >
            -
          </Button>
          <h1>{count}</h1>

          <Button
            onClick={() => addToCart(product as Product)}
            className="hover:bg-primary-light/20 self-center px-4 py-2 transition duration-400"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(CartItem)
