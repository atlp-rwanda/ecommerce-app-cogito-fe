import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface UpdateData {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string[];
  quantity: number;
  stock: number;
  category_id: number;
}

// Get product data by ID from the API_URL
export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (id: number, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await URL.get(`/product/${id}`, config);
      console.log(response);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Unable to fetch product data');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update product data by ID using the API_URL
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, name, description, price, image, quantity, stock, category_id }: UpdateData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await URL.put(`/product/${id}`, {
        id,
        name,
        description,
        price,
        image,
        quantity,
        stock,
        category_id,
      }, config);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Unable to update product');
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
