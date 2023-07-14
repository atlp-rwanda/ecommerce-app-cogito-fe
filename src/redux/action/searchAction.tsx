import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import { Product } from '../../types/searchTypes';
interface SearchPayload {
  name: string;
  description: string;
  price: string;
}
export const searchProduct = createAsyncThunk<Product, SearchPayload>('search', async ({ name, description, price }) => {
  try {
    const response = await URL.get(`/search`, { params: { name, description, price } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error');
  }
});
