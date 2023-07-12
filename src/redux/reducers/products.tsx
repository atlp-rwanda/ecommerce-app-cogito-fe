import { createSlice } from '@reduxjs/toolkit'
import { getAllProducts } from '../action/products';

export const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState:{
    products: {
        items:[]
    },
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Get all products failed';
      });
    }
})

export const { actions, reducer } = allProductsSlice;
export default allProductsSlice.reducer;
