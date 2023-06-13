import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface userCredentials {
  email: string;
  password: string;
}
interface LoginResponseData {
  data: object;
  error: boolean;
  loading: boolean;
  status: null | string;
}

export const handleLogin = createAsyncThunk<LoginResponseData, userCredentials>('login', async (userCredentials, { rejectWithValue }) => {
  try {
    const loginDataRequest = await URL.post('/login', userCredentials);
    const loginDataResponse = await loginDataRequest.data;
    const token = loginDataResponse.token;
    localStorage.setItem('token', token);
    localStorage.setItem('roleId', loginDataResponse.data.roleId);
    console.log(loginDataResponse);
    if (loginDataResponse.status != 307) {
      const ID = loginDataResponse.data.id;
      localStorage.setItem('User ID', JSON.stringify(ID));
    } else {
      const ID = loginDataResponse.data.id;
      localStorage.setItem('User ID', JSON.stringify(ID));
    }
    return loginDataResponse;
  } catch (error) {
    return rejectWithValue(error);
  }
});
