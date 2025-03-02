import React, {
  createContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { FetchError } from '../../types/FetchError'
import { ToastContainer, toast } from 'react-toastify'
import { Product } from '../../types/Product'
import { addPrices, subtractPrices } from '../../utils'
import { useFetchProducts } from '../../hooks/useFetchProducts'

interface CartContextType {
  cartItems: Product[]
  products: Product[] | undefined
  isLoading: boolean
  error: FetchError
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const { data: products, isLoading, error } = useFetchProducts()
  const toastRef = useRef<ReturnType<typeof toast.success> | null>(null)

  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])

  const notify = (product: Product) => {
    const toastId = `product-${product.id}`

    toastRef.current = toast.success(`Added ${product.title} to cart`, {
      toastId,
    })
  }

  const addToCart = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (itemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          totalPrice: addPrices(
            updatedItems[itemIndex].totalPrice,
            updatedItems[itemIndex].price,
          ),
          count: updatedItems[itemIndex].count + 1,
        }

        return updatedItems
      }

      notify(product)
      return [...prevItems, { ...product, count: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.findIndex((item) => item.id === productId)
      if (prevItems[itemToRemove].count > 1) {
        const updatedItems = [...prevItems]
        updatedItems[itemToRemove] = {
          ...updatedItems[itemToRemove],
          totalPrice: subtractPrices(
            updatedItems[itemToRemove].totalPrice,
            updatedItems[itemToRemove].price,
          ),
          count: updatedItems[itemToRemove].count - 1,
        }
        return updatedItems
      } else {
        return prevItems.filter((item) => item.id !== productId)
      }
    })
  }, [])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartTotal,
        products,
        isLoading,
        error,
      }}
    >
      {children}
      <ToastContainer position="top-center" autoClose={2000} />
    </CartContext.Provider>
  )
}

export { CartContext }
export type { CartContextType }
