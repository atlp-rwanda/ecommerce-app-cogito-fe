import { createSlice } from '@reduxjs/toolkit';
import { verifyOTP } from '../action/TfaAction';
interface IndexState {
  data: object;
  status: string;
  message: string | undefined;
  isLoading: boolean;
  error: boolean;
}

const initialState: IndexState = {
  data: {},
  status: '',
  message: '',
  isLoading: false,
  error: false,
};

const tfaSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        const { message } = action.error;
        state.error = true;
        state.isLoading = false;
        state.message = message;
      });
  },
});
export default tfaSlice.reducer;
