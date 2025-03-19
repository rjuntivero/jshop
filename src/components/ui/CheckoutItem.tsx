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
      <article className="motion-preset-blur-down def-padding flex flex-col gap-8 duration-400 sm:flex-row md:flex-row">
        <Link to="/" className="h-auto max-w-[150px]">
          <img
            className="h-full w-full rounded-sm object-contain transition-all duration-400 hover:-translate-y-3 hover:scale-102"
            src={imageURL}
            alt="Product Image"
          />
        </Link>
        <div>
          <div className="md:p-4">
            <h1 className="font-main mb-2 text-[clamp(1rem,2vw,2rem)]">
              {productName}
            </h1>
            <h1 className="font-main mb-2 text-[clamp(0.8rem,1.5vw,1.5rem)]">
              {productType}
            </h1>
            <h2 className="font-main pb-2 text-[clamp(1.5rem,2vw,2rem)] font-semibold">
              {'$' + totalPrice}
            </h2>
          </div>
          <div className="flex flex-col items-center md:flex-row">
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
            <div className="text-secondary-light flex">
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
