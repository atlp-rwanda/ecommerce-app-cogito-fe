import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addProduct } from '../../action/AddAction';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.status = 'pending';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = 'success';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.status = 'error';
      });
  },
});

export default productSlice.reducer;
export const productSliceAction = productSlice.actions;
