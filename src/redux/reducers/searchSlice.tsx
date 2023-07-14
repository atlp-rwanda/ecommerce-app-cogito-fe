import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchProduct } from './../action/searchAction';

const initialState = {
  loading: false,
  products: [],
  error: null as null | string,
};

const searchSlice = createSlice({
  name: 'search product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProduct.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default searchSlice.reducer;
