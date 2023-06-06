import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  password: string;
}

const initialState: UserState = {
  email: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup, (state, action: PayloadAction<UserState>) => {
        const { email, password } = action.payload;
        state.email = email;
        state.password = password;
      })
      .addCase(login, (state, action: PayloadAction<UserState>) => {
        const { email, password } = action.payload;
        state.email = email;
        state.password = password;
      })
  },
});

export const { signup, login } = userSlice.actions;

export default userSlice.reducer;
