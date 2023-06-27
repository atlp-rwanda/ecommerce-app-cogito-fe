import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface userCredentials {
  email: string;
  password: string;
}
interface LoginResponseData {
  data: object;
  error: null | string;
  loading: boolean;
  status: string;
}

export const handleLogin = createAsyncThunk<LoginResponseData, userCredentials>('login', async (userCredentials, { rejectWithValue }) => {
  try {
    const loginDataRequest = await URL.post('/login', userCredentials);
    const loginDataResponse = await loginDataRequest.data;
    const token = loginDataResponse.token;
    localStorage.setItem('token', token);
    localStorage.setItem('roleId', loginDataResponse.data.roleId);
    return loginDataResponse;
  } catch (error) {
    return rejectWithValue(error);
  }
});
