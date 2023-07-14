import { createSlice } from '@reduxjs/toolkit';
import { changeAccountStatus } from '../action/AccountStatusAction';
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

const changeStatus = createSlice({
  name: 'changeStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeAccountStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(changeAccountStatus.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(changeAccountStatus.rejected, (state, action) => {
        const { message } = action.error;
        state.error = true;
        state.isLoading = false;
        state.message = message;
      });
  },
});
export default changeStatus.reducer;
