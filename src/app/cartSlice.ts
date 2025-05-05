import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types/Product'

interface Cart {
  items: Product[]
  totalPrice: number
  isCartOpen: boolean
  isDirectoryOpen: boolean
}

const initialState: Cart = {
  items: [],
  totalPrice: 0,
  isCartOpen: false,
  isDirectoryOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.count += 1
        existingItem.totalPrice = existingItem.price * existingItem.count
      } else {
        state.items.push({ ...product, count: 1, totalPrice: product.price })
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload,
      )
      if (itemToRemove && itemToRemove.count > 1) {
        itemToRemove.count -= 1
        itemToRemove.totalPrice = itemToRemove.price * itemToRemove.count
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload)
      }
    },
    clearCart(state) {
      state.items = []
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen
    },
    toggleDirectory(state) {
      state.isDirectoryOpen = !state.isDirectoryOpen
    },
    cartTotal(state) {
      state.items = state.items.map((item) => {
        const totalPrice = item.price * item.count
        return { ...item, totalPrice }
      })
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleCart,
  toggleDirectory,
} = cartSlice.actions

export default cartSlice.reducer
