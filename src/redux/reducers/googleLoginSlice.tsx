import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginWithGoogle } from '../action/googleLoginAction';

interface GoogleLoginData {
  GL_State: string;
  GL_Loading: boolean;
  GL_Error: string | null;
  GL_Token: string;
}

const initialState: GoogleLoginData = {
  GL_State: 'INITIAL',
  GL_Loading: false,
  GL_Error: null,
  GL_Token: '',
};

const googleLoginSlice = createSlice({
  name: 'googleLogin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
       state.GL_State = 'PENDING';
       state.GL_Loading = true;
       state.GL_Error = null;
       state.GL_Token = '';
      })
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<any>) => {
        state.GL_State = 'FULFILLED';
        state.GL_Loading = false;
        state.GL_Error = null;
        state.GL_Token = action.payload.token;
       })
       .addCase(loginWithGoogle.rejected, (state, action: PayloadAction<any>) => {
        state.GL_State = 'REJECTED';
        state.GL_Loading = false;
        state.GL_Error = action.payload;
        state.GL_Token = '';
       });
  },
});
export const googleLoginSliceAction = googleLoginSlice.actions;
export default googleLoginSlice.reducer;