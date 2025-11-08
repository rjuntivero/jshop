import { createSlice } from '@reduxjs/toolkit';

export type UiState = {
  isCartOpen: boolean;
  isDirectoryOpen: boolean;
};

const initialState: UiState = {
  isCartOpen: false,
  isDirectoryOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    openDirectory(state) {
      state.isDirectoryOpen = true;
    },
    closeDirectory(state) {
      state.isDirectoryOpen = false;
    },
    toggleDirectory(state) {
      state.isDirectoryOpen = !state.isDirectoryOpen;
    },
  },
});

export const { openCart, closeCart, toggleCart, openDirectory, closeDirectory, toggleDirectory } =
  uiSlice.actions;

export default uiSlice.reducer;
