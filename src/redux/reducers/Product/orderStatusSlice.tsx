import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderStatus } from '../../action/checkout/getOrder';

const initialFetchState= {
  data: [],
  loading: false,
  error: false,
};
const getOrderStatusSlice = createSlice({
  name: 'orderStatus',
  initialState: {
    state: initialFetchState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderStatus.pending, (state) => {
        state.state.loading = true;
        state.state.error = false;
      })
      .addCase(getOrderStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.state.loading = false;
        state.state.data = action.payload.data;
        state.state.error = false;
      })
      .addCase(getOrderStatus.rejected, (state) => {
        state.state.loading = false;
        state.state.error = true;
      });
  },
});
export default getOrderStatusSlice.reducer;
export const getOrderStatusSliceAction = getOrderStatusSlice.actions;
