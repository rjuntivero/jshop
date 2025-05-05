import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types/Product'

interface Cart {
  items: Product[]
  isCartOpen: boolean
  isDirectoryOpen: boolean
}

const initialState: Cart = {
  items: [],
  isCartOpen: false,
  isDirectoryOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.items.push(action.payload)
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
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
