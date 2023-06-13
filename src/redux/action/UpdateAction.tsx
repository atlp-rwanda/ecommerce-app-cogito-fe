import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface UpdateProductData {
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  stocks: string;
  category_id: number;
}

export const updateProduct = createAsyncThunk(
  'cogito/UpdateProduct',
  async (data: UpdateProductData) => {
    try {
      const response = await URL.put('/product/${id}', data); // Assuming the API endpoint for updating a product is '/product'
      return response.data;
    } catch (error) {
      throw new Error('Update failed');
    }
  }
);
export default updateProduct;
