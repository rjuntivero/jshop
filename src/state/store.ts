import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import searchReducer from '../features/searchSlice';
import uiReducer from '../features/uiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    // UI flags (ephemeral UI state) live in their own slice to avoid
    // coupling domain logic (cart) with presentation concerns.
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
