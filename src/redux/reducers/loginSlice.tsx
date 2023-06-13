import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { handleLogin } from '../action/loginAction';

interface LoginData {
  state: string;
  data: string | null;
  status: string;
  loading: boolean;
  error: boolean;
}

const initialState: LoginData = {
  state: 'INITIAL',
  data: null,
  status: '',
  loading: false,
  error: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.state = 'PENDING'
        state.loading = true;
        state.status = '';
        state.error = false;
        state.data = null;
      })
      .addCase(handleLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.state = 'FULFILLED';
        state.loading = false;
        state.status = action.payload.status;
        state.error = false;
        state.data = action.payload.message;
      })
      .addCase(handleLogin.rejected, (state, action: PayloadAction<any>) => {
        state.state = 'REJECTED';
        state.loading = false;
        state.status = action.payload.response.data.status;
        state.error = true;
        state.data = action.payload.response.data.message;
      });
  },
});
export const loginSliceAction = loginSlice.actions;
export default loginSlice.reducer;
