import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { handleUpdatePassword } from '../action/UpdatePasswordAction';

interface UpdatePasswordState {
  state: string;
  data: string;
  status: number | null;
  loading: boolean;
  error: boolean;
}

const initialState: UpdatePasswordState = {
  state: 'INITIAL',
  data: '',
  status: null,
  loading: false,
  error: false,
};

const updatePasswordSlice = createSlice({
  name: 'Update Password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleUpdatePassword.pending, (state) => {
        state.state = 'PENDING';
        state.loading = true;
        state.status = null;
        state.error = false;
        state.data = '';
      })
      .addCase(handleUpdatePassword.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action);
        state.state = 'FULFILLED';
        state.loading = false;
        state.status = action.payload.status;
        state.data = action.payload.message;
        state.error = false;
      })
      .addCase(handleUpdatePassword.rejected, (state, action: PayloadAction<any>) => {
        state.state = 'REJECTED';
        state.loading = false;
        state.status = action.payload.status;
        state.error = true;
        state.data = action.payload.response.data.message;
      });
  },
});
export const updatePasswordSliceAction = updatePasswordSlice.actions;
export default updatePasswordSlice.reducer;
