import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../../utils/api';

export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        Authorization:`Bearer ${token}` 
      }
    }
    const response = await URL.get(`/cart`,config);
    return response.data;
  } catch (error:any) {
    throw error.response.data.message;
  }
});

export const checkout = createAsyncThunk('cart/checkout', async (userId:any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await URL.post('/checkout', {userId}, config);
    return response.data.message;
  } catch (error: any) {
    throw error.response.data.message;
  }
});
