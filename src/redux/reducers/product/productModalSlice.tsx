import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductById } from '../../action/fetchProductAction';

interface FetchState {
  data: any[]; // Update the type of data as per your product data structure
  loading: boolean;
  error: boolean | string | undefined;
  selectedProduct: any | null;
}

const initialState: FetchState = {
  data: [],
  loading: false,
  error: false,
  selectedProduct: null,
};

const fetchmodalSlice = createSlice({
  name: 'Allproducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.items;
        state.error = false;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default fetchmodalSlice.reducer;
