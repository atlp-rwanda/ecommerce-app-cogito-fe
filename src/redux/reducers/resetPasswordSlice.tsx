import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { resetPassword } from '@/redux/action/resetPasswordAction';

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
        state.status = 'Password Reset Request Successfully!';
        state.data = action.payload;
        state.error = null;
        toast.success('Password Resent Link sent Your Email');
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.status = 'Reset Password Request Unsuccessfull!';
        state.error = null;
        toast.error('Request to Change Password Unsuccessful, Try Again');
      });
  },
});
export default resetPassowrdSlice.reducer;
