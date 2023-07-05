import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export const getCategories = createAsyncThunk('cogito/category', async () => {
  try {
    const response = await URL.get(`/category`);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
