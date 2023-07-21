import { createSlice } from '@reduxjs/toolkit';
import { fetchUserCart, checkout } from '../../action/checkout/checkout';

const initialState = {
  cartItems: [],
  checkoutStatus: 'idle',
  status: null, // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const cartItemsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fetchUserCart action
    builder.addCase(fetchUserCart.pending, (state) => {
      state.checkoutStatus = 'loading';
      state.status = null; 
    });
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.data;
      state.status = action.payload.status
      state.checkoutStatus = 'succeeded';
    });
    builder.addCase(fetchUserCart.rejected, (state,action:any) => {
      state.checkoutStatus = 'failed';
      state.status = action.payload.response.data.status;
    });

    // Handle the checkout action
    builder.addCase(checkout.pending, (state) => {
      state.checkoutStatus = 'loading';
      state.status = null;
    });
    builder.addCase(checkout.fulfilled, (state,action) => {
      state.checkoutStatus = 'succeeded';
      state.status = action.payload.status
    });
    builder.addCase(checkout.rejected, (state) => {
      state.checkoutStatus = 'failed';
    });
  },
});

export default cartItemsSlice.reducer;
