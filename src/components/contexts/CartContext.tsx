import React, { createContext, useState, useContext, ReactNode } from 'react'
import { Product } from '../../types/Product'

interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (itemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          count: updatedItems[itemIndex].count + 1,
        }

        return updatedItems
      }
      return [...prevItems, { ...product, count: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.findIndex((item) => item.id === productId)
      if (prevItems[itemToRemove].count > 1) {
        const updatedItems = [...prevItems]
        updatedItems[itemToRemove] = {
          ...updatedItems[itemToRemove],
          count: updatedItems[itemToRemove].count - 1,
        }
        return updatedItems
      } else {
        return prevItems.filter((item) => item.id !== productId)
      }
    })
  }
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
