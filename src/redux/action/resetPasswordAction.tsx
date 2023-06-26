import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const resetPassword = createAsyncThunk('auth/forgot', async (email: string, thunkAPI) => {
  try {
    const response = await URL.post(`/auth/forgot`, { email });

    // Store the token in a cookie
    document.cookie = `token=${response.data.token}; path=/;`;

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
interface resetData {
  token: string | undefined;
  newPassword: string;
}
export const updatePassword = createAsyncThunk('/auth/reset', async ({ token, newPassword }: resetData, thunkAPI) => {
  try {
    // Make sure the token is available
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await URL.post(`/auth/reset/${token}`, { newPassword: newPassword });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
