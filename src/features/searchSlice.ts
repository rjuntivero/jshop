import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SearchState = {
  query: string;
};

const initialState: SearchState = {
  query: 'All',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
