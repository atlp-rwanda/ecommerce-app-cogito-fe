import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

type Item = {
  productId: number;
  reason: string;
};
type ProductData = {
  data: Item;
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('error'); // Something went wrong!
  }
});

export const productRemove = createAsyncThunk('products/productRemove', async ({ data }: ProductData, thunkAPI) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    const response = await URL.delete(`/product/${data.productId}`, {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
