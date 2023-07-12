import { createSlice } from '@reduxjs/toolkit'
import { getWishlist } from '../action/wishlistAction';

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState:{
    wishlist: {
        data:[]
    },
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Get wishlist failed';
      });
    }
})

export const { actions, reducer } = wishlistSlice;
export default wishlistSlice.reducer;
