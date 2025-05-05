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
        state.totalPrice =
          Math.round((state.totalPrice + product.price) * 100) / 100
      } else {
        state.items.push({ ...product, count: 1, totalPrice: product.price })
        state.totalPrice =
          Math.round((state.totalPrice + product.price) * 100) / 100
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload,
      )
      if (itemToRemove && itemToRemove.count > 1) {
        itemToRemove.count -= 1
        itemToRemove.totalPrice = itemToRemove.price * itemToRemove.count
        state.totalPrice =
          Math.round((state.totalPrice - itemToRemove.price) * 100) / 100
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload)
        state.totalPrice =
          Math.round((state.totalPrice - (itemToRemove?.price || 0)) * 100) /
          100
      }
    },
    clearItem(state, action: PayloadAction<number>) {
      const itemToClear = state.items.find((item) => item.id === action.payload)
      if (itemToClear) {
        state.totalPrice -= itemToClear.totalPrice
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
  clearItem,
} = cartSlice.actions

export default cartSlice.reducer
