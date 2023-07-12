import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import axios from 'axios';

export const getWishlist = createAsyncThunk('wishlist/get', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://localhost:9999/wishlist`, config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (productId:number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`http://localhost:9999/wishlist`,{productId}, config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});

export const deleteOne = createAsyncThunk('wishlist/delete', async (id:number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`http://localhost:9999/wishlist/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});

export const empty = createAsyncThunk('wishlist/deleteAll', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`http://localhost:9999/wishlist`, config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
