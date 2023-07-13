import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../../action/fetchProductAction';
interface fetchstate {
  [x: string]: any;
  data: [];
  loading: boolean;
  error: boolean;
}
const initialState: fetchstate = {
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
      });
  },
});
export default fetchSlice.reducer;
