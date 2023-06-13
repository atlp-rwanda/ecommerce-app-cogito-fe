import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCollection = createAsyncThunk('seller/getCollection', async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Accept-Language': 'en',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await URL.get('/seller/items', config);
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});
