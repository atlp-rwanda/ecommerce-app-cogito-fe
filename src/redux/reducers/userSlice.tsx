import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signup } from '../action/registerAction';

interface UserState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  email: '',
  password: '',
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<UserState>) => {
        const { email, password } = action.payload;
        state.email = email;
        state.password = password;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Signup failed';
      });
  },
});

export default userSlice.reducer;
