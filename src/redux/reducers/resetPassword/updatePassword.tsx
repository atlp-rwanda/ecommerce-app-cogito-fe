import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { updatePassword } from '../../action/resetPasswordAction';

const resetPassowrdSlice = createSlice({
  name: 'Update',
  initialState: {
    data: null,
    status: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.status = 'Loading';
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = 'Password Successfully Reset!';
        state.data = action.payload;
        state.error = null;
        toast.success('Password Successfully Reset!');
      })
      .addCase(updatePassword.rejected, (state) => {
        state.loading = false;
        state.status = 'Password Reset Unsuccessfully!';
        state.error = null;
        toast.error('Password Reset Unsuccessful!');
      });
  },
});
export default resetPassowrdSlice.reducer;
