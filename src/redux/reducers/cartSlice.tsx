import { createSlice } from '@reduxjs/toolkit';
import { fetchCart } from '../action/CartAction';

interface CartState {
  items: any;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch cart items.';
    });
  },
});

export default cartSlice.reducer;
