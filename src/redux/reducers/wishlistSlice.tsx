import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWishlist } from '../action/wishlistAction';


type WishlistItem = {
  wishlistItem:{
    id:number;
    product:{
      id:number;
      name:string;
      image:string[];
      price:number;
    };
  };
  vendor:{
    businessName: string;
    businessLogo:string;
    businessAddress: string;
  };
  averageReview: number;
}
interface WishlistState {
  wishlist: {
    data: WishlistItem[];
  };
  loading: boolean;
  error: string;
}

const initialState: WishlistState = {
  wishlist: {
    data: [],
  },
  loading: false,
  error: '',
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<{status: number, data: WishlistItem[]}>) => {
      state.wishlist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.wishlist.data = action.payload;
        state.loading = false;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Get wishlist failed';
      });
  },
});

export const { actions, reducer } = wishlistSlice;
export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
