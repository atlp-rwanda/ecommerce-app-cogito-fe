import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import { RootState } from '../store/store';

type WishlistItem = {
  wishlistItem:{
    id:number;
    product:{
      id:number;
      name:string;
      image:string[];
      price:number;
    };
  };
  vendor:{
    businessName: string;
    businessLogo:string;
    businessAddress: string;
  };
  averageReview: number;
}

export const getWishlist = createAsyncThunk<WishlistItem[], void, { state: RootState }>('wishlist/get', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await URL.get('/wishlist', config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (productId: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await URL.post(`/wishlist`, { productId }, config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});

export const deleteOne = createAsyncThunk('wishlist/delete', async (id: number) => {
  console.log('id', id);
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await URL.delete(`/wishlist/${id}`, config);
    console.log(response.data);
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
    const response = await URL.delete(`/wishlist`, config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
