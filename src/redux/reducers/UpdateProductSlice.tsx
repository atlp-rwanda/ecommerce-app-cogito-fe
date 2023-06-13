import { createSlice } from '@reduxjs/toolkit';
import { updateProduct } from '../action/UpdateAction';

interface UpdateProductState {
  loading: boolean;
  error: string | null;
  success: string | null;
  updatedProduct: string| null;
  state: string| null;
  data: string;
}

const initialState: UpdateProductState = {
  loading: false,
  error: null,
  success: null,
  updatedProduct: null,
  state: 'initial',
  data:''
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
        state.state= 'PENDING';
        state.data= '';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.state= 'FULFILLED';
        state.data= action.payload.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Update failed';
        state.state= 'REJECTED';
        state.data= '';
        })
  },
});

export default updateProductSlice.reducer;