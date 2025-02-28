import { Product } from '../../types/Product'

import Button from '../ui/Button'
import CartItem from '../ui/CartItem'

interface SidebarProps {
  onClose: () => void
  className?: string
  cartItems?: Product[]
}

const CartSidebar: React.FC<SidebarProps> = ({
  onClose,
  className,
  cartItems,
}) => {
  return (
    <>
      <aside className={className + ' *:font-sub-header'}>
        <div className="mb-4 w-full border-b-3 pb-2">
          <h1 className="font-big-header text-primary-light self-center justify-self-center text-3xl">
            My Cart
          </h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {cartItems &&
            cartItems?.map((item) => (
              <CartItem
                key={item.id}
                productName={item.title}
                productType={item.category}
                imageURL={item.image}
              />
            ))}
          {cartItems?.length === 0 && (
            <h1 className="font-sub-header text-primary-light self-center text-3xl">
              Cart is empty...
            </h1>
          )}
        </div>

        <Button
          onClick={onClose}
          className="bg-secondary-light z-40 mt-4 flex items-center justify-center rounded-sm p-4 text-black"
        >
          Checkout
        </Button>
      </aside>
    </>
  )
}

export default CartSidebar
