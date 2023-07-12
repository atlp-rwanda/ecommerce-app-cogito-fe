import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export const getAllProducts = createAsyncThunk('products/all', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await URL.get(`/buyer/items`, config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
