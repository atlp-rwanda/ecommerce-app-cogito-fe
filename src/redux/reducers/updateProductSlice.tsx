import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProduct } from '../action/ProductAction';

interface fetchstate {
  data: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string[];
    stock: string;
    category_id: number;
    quantity: number;
    expiredAt: string;
    createdAt: string;
    updatedAt: string;
  } ;
  loading: boolean;
  error: boolean;
}
const initialFetchState: fetchstate = {
  data: {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: [],
    stock: '',
    category_id: 0,
    quantity: 0,
    expiredAt: '',
    createdAt: '',
    updatedAt: '',
  },
  loading: false,
  error: false,
};
const updateProductslice = createSlice({
  name: 'ProductUpdate',
  initialState: {
    state: initialFetchState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.state.loading = true;
        state.state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.state.loading = false;
        state.state.data = action.payload.item;
        state.state.error = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.state.loading = false;
        state.state.error = true;
      });
  },
});
export default updateProductslice.reducer;
export const updateProductsliceAction = updateProductslice.actions;