import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';
import { Cart } from '@/types/Cart';

const initialState: Cart = {
  items: [],
  totalPrice: 0,
  isCartOpen: false,
  isDirectoryOpen: false,
  searchQuery: 'All',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const quantityToAdd = product.quantity && product.quantity > 0 ? product.quantity : 1;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice =
          Math.round(existingItem.price * existingItem.quantity * 100) / 100;
        state.totalPrice =
          Math.round((state.totalPrice + existingItem.price * quantityToAdd) * 100) / 100;
      } else {
        const itemToPush: Product = {
          ...product,
          quantity: quantityToAdd,
          totalPrice: Math.round(product.price * quantityToAdd * 100) / 100,
        };
        state.items.push(itemToPush);
        state.totalPrice =
          Math.round((state.totalPrice + product.price * quantityToAdd) * 100) / 100;
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      if (itemToRemove && itemToRemove.quantity > 1) {
        itemToRemove.quantity -= 1;
        itemToRemove.totalPrice = itemToRemove.price * itemToRemove.quantity;
        state.totalPrice = Math.round((state.totalPrice - itemToRemove.price) * 100) / 100;
      } else {
        return;
      }
    },
    clearItem(state, action: PayloadAction<number>) {
      const itemToClear = state.items.find((item) => item.id === action.payload);
      if (itemToClear) {
        state.totalPrice -= itemToClear.totalPrice;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    toggleDirectory(state) {
      state.isDirectoryOpen = !state.isDirectoryOpen;
    },
    cartTotal(state) {
      state.items = state.items.map((item) => {
        const totalPrice = item.price * item.quantity;
        return { ...item, totalPrice };
      });
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleCart,
  toggleDirectory,
  clearItem,
  setSearchQuery,
} = cartSlice.actions;

export default cartSlice.reducer;
