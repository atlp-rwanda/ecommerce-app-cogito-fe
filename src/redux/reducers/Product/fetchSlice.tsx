import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../../action/ProductAction';
// import { addProduct } from '../../action/AddAction';
interface fetchstate {
  data: [];
  loading: boolean;
  error: boolean;
}
const initialFetchState: fetchstate = {
  data: [],
  loading: false,
  error: false,
};
const fetchSlice = createSlice({
  name: 'Allproducts',
  initialState: {
    state: initialFetchState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.state.loading = true;
        state.state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.state.loading = false;
        state.state.data = action.payload.items;
        state.state.error = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.state.loading = false;
        state.state.error = true;
      });
  },
});
export default fetchSlice.reducer;
export const fetchSliceAction = fetchSlice.actions;
