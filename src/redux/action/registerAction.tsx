
import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface SignupData {
  email: string;
  password: string;
}

export const signup = createAsyncThunk('/signup', async (data: SignupData) => {
  try {
    const response = await URL.post('/buyer/signup', data);
    return response.data;
  } catch (error) {
    throw new Error('Signup failed');
  }
});