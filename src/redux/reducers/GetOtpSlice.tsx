import { createSlice } from '@reduxjs/toolkit';
import { getOtp } from '../action/GetOtp';
interface IndexState {
  status: number | null;
  message: string | undefined;
  isLoading: boolean;
  error: boolean;
}

const initialState: IndexState = {
  status: null,
  message: '',
  isLoading: false,
  error: false,
};

const getOtpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOtp.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(getOtp.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getOtp.rejected, (state, action) => {
        const { message } = action.error;
        state.error = true;
        state.isLoading = false;
        state.message = message;
      });
  },
});
export default getOtpSlice.reducer;
