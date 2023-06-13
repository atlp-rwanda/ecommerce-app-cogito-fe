import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export const getProfile = createAsyncThunk('cogito/profile', async () => {
  try {
    const response = await URL.get('/profile/3');
    console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
