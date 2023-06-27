import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOtp = createAsyncThunk('verify/OTP', async () => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const response = await URL.get('otp/sendotp', { headers: { 'Accept-language': 'en', Authorization: token } });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});
