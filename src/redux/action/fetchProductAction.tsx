import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

type ProductData = {
  productId: number;
};
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

export const productRemove = createAsyncThunk('products/productRemove', async (data: ProductData, thunkAPI) => {
  console.log(data);
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    const response = await URL.delete(`/product/${data.productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (data: ProductData, thunkAPI) => {
  console.log(data);
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    const response = await URL.delete(`/product/${data.productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
