import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const verifyOTP = createAsyncThunk('verify/OTP', async (otp: string) => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const response = await URL.post('otp/verify', { otp }, { headers: { 'Accept-language': 'en', Authorization: token } });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});
