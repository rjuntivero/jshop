import { memo } from 'react'
import Button from './Button'
import { Product } from '../../types/Product'
import { useCart } from '../../hooks/useCart'
import { Link } from 'react-router-dom'

interface T {
  product?: Product
  productName?: string
  productPrice?: number
  productType?: string
  totalPrice?: number
  imageURL?: string
  count?: number
}

const CheckoutItem: React.FC<T> = ({
  product,
  productName,
  productType,
  totalPrice,
  imageURL,
  count,
}) => {
  const { addToCart, removeFromCart, clearItem } = useCart()
  return (
    <section className="mb-8">
      <hr className="text-gray-300" />
      <article className="motion-preset-blur-down flex gap-8 p-8 duration-400">
        <Link to="/" className="max-w-[175px]">
          <img
            className="h-full w-full rounded-sm object-cover transition-all duration-400 hover:-translate-y-3 hover:scale-102"
            src={imageURL}
            alt="Product Image"
          />
        </Link>
        <div>
          <div className="p-4">
            <h1 className="font-main mb-2 text-2xl">{productName}</h1>
            <h1 className="font-main mb-2 text-xl">{productType}</h1>
            <h2 className="font-main pb-2 text-[1.5rem] font-semibold">
              {'$' + totalPrice}
            </h2>
          </div>
          <div className="flex items-center">
            <div className="bg-secondary-light/15 m-3 flex max-w-50 items-center justify-between rounded-sm text-xl shadow-md">
              <Button
                onClick={() => removeFromCart(product?.id as number)}
                className="hover:bg-primary-light/20 px-4 py-2 transition duration-400"
              >
                -
              </Button>
              <h1>{count}</h1>
              <Button
                onClick={() => addToCart(product as Product)}
                className="hover:bg-primary-light/20 px-4 py-2 transition duration-400"
              >
                +
              </Button>
            </div>
            <div className="text-secondary-light">
              |{' '}
              <Button onClick={() => clearItem(product?.id as number)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </article>
      <hr className="text-gray-300" />
    </section>
  )
}

export default memo(CheckoutItem)
