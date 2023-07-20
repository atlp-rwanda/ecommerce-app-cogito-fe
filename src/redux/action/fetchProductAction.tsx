import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export const fetchProducts = createAsyncThunk('products/fetchProduct', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await URL.get('/seller/items', config); //URL HERE
    return response.data;
  } catch (error) {
    throw new Error('error'); // Something went wrong!
  }
});

export const productRemove = createAsyncThunk('products/productRemove', async (productId: number, thunkAPI) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    const response = await URL.delete(`/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId: string, thunkAPI) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    const response = await URL.get(`/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
