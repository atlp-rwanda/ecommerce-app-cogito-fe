import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, productRemove } from '../../action/fetchProductAction';

interface FetchState {
  data: any[]; // Update the type of data as per your product data structure
  loading: boolean;
  error: boolean | string | undefined;
}

const initialState: FetchState = {
  data: [],
  loading: false,
  error: false,
};

const fetchSlice = createSlice({
  name: 'Allproducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.items;
        state.error = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(productRemove.fulfilled, (state, action: PayloadAction<{ productId: string }>) => {
        const removedProductId = action.payload.productId;
        state.data = state.data.filter((product) => product.id !== removedProductId);
      })
      .addCase(productRemove.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default fetchSlice.reducer;
