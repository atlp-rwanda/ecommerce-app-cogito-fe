import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productRemove } from '../../action/fetchProductAction';

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

const deleteSlice = createSlice({
  name: 'Allproducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productRemove.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(productRemove.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.items;
        state.error = false;
      })
      .addCase(productRemove.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default deleteSlice.reducer;
