import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import axios from 'axios';

export const getAllProducts = createAsyncThunk('products/all', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://localhost:9999/products/buyer`);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
