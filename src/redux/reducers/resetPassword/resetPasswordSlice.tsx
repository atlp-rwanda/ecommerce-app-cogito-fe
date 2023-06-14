import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { resetPassword } from '../../action/resetPasswordAction';

const resetPassowrdSlice = createSlice({
  name: 'User',
  initialState: {
    data: null,
    status: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = 'Password Reset Request was Successfully!';
        state.data = action.payload;
        state.error = null;
        toast.success('Resent Link sent to Your Email');
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.status = 'Request to reset the password was unsuccessful!';
        state.error = null;
        toast.error('Attempt to change the password was Unsuccessful, Try Again');
      });
  },
});
export default resetPassowrdSlice.reducer;
