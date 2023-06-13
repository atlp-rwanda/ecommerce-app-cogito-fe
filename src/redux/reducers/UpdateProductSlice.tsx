import { createSlice } from '@reduxjs/toolkit';
import { updateProduct } from '../action/UpdateAction';

interface UpdateProductState {
  loading: boolean;
  error: string | null;
  success: string | null;
  updatedProduct: string| null;
}

const initialState: UpdateProductState = {
  loading: false,
  error: null,
  success: null,
  updatedProduct: null,
};

const updateProductSlice = createSlice({
  name: 'updateProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updatedProduct = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Update failed';
        })
  },
});
export default updateProductSlice.reducer;
