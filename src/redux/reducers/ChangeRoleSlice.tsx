import { createSlice } from '@reduxjs/toolkit';
import { changeRole } from '../action/ChangeRoleAction';
interface IndexState {
  status: number | null;
  message: string | undefined;
  isLoading: boolean;
  error: boolean;
  response: object;
}

const initialState: IndexState = {
  status: null,
  message: '',
  isLoading: false,
  error: false,
  response: {},
};

const changeUserRole = createSlice({
  name: 'set_role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.response = action.payload.response;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(changeRole.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(changeRole.rejected, (state, action) => {
        const { message } = action.error;
        state.error = true;
        state.isLoading = false;
        state.message = message;
      });
  },
});
export default changeUserRole.reducer;
