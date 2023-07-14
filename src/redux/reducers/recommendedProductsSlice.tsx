import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getAllRecommendedProducts } from '../action/Recommended';


interface productData {
    data: [] | null | any;
    status: number | null;
    loading: boolean;
    error: boolean;
    message: string;
  }

  const initialState: productData = {
    data: null,
    status: null,
    loading: false,
    error: false,
    message: '',
  };

export const recommendedSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecommendedProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllRecommendedProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload.response;
        state.loading = false;
        state.status = 200;
        state.error = false;
      })
      .addCase(getAllRecommendedProducts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.status = 500;
        state.data = action.payload.message ?? 'Getting all recommended products failed';
      });
    }
})

export const { actions, reducer } = recommendedSlice;
export default recommendedSlice.reducer;
