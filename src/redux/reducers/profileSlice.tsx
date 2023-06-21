import { createSlice } from '@reduxjs/toolkit';
import { getProfile } from './../action/profileAction';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  gender: string;
  birthdate: string;
  phone: string;
  preferred_language: string;
  preferred_currency: string;
  billingAddress: Array<string>;
  password: string;
  resetToken: string;
  resetTokenExpiry: string;
  roleId: number;
  lastPasswordUpdate: string;
  confirmationCode: string;
  confirmed: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const initialProfileState: UserProfile = {
  id: 0,
  name: '',
  email: '',
  gender: '',
  birthdate: '',
  phone: '',
  preferred_language: '',
  preferred_currency: '',
  billingAddress: [''],
  password: '',
  resetToken: '',
  resetTokenExpiry: '',
  roleId: 0,
  lastPasswordUpdate: '',
  confirmationCode: '',
  confirmed: false,
  status: '',
  createdAt: '',
  updatedAt: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    value: initialProfileState,
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const { actions, reducer } = profileSlice;
export default profileSlice.reducer;
