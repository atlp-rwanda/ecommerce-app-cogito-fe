import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface userCredentials{
  email: string;
  password: string;
}
interface LoginResponseData {
  data: object;
  error: null | string;
  loading: boolean;
  status: string;
}

export const handleLogin = createAsyncThunk<
LoginResponseData,
userCredentials
>(
  'login',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const loginDataRequest = await URL.post('/login', userCredentials);
      const loginDataResponse = await loginDataRequest.data;
      const token = loginDataResponse.token;
      localStorage.setItem('token', JSON.stringify(token));
      const ID = loginDataResponse.data.id;
      const RoleID = loginDataResponse.data.roleId;
      localStorage.setItem('User ID', JSON.stringify(ID));
      localStorage.setItem('User Role ID', JSON.stringify(RoleID));
      return loginDataResponse;
    } catch (error) {
        return rejectWithValue(error);
    }
  }
);

