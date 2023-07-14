import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export const getAllProducts = createAsyncThunk('products/all', async () => {
  try {
    const response = await URL.get(`/products/buyer`);

    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});

export const getCategoryProducts = createAsyncThunk('products/all', async (categoryId: number) => {
  try {
    const response = await URL.get(`category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
