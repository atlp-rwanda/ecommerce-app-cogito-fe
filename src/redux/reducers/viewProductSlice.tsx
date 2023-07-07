import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewProduct , updateProduct} from '../action/ProductAction';

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
const fetchViewSlice = createSlice({
  name: 'ProductView',
  initialState: {
    state: initialFetchState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ViewProduct.pending, (state) => {
        state.state.loading = true;
        state.state.error = false;
      })
      .addCase(ViewProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.state.loading = false;
        state.state.data = action.payload.item;
        state.state.error = false;
      })
      .addCase(ViewProduct.rejected, (state) => {
        state.state.loading = false;
        state.state.error = true;
      });
  },
});
export default fetchViewSlice.reducer;
export const fetchViewSliceAction = fetchViewSlice.actions;