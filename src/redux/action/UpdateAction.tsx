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
export const getProductById = createAsyncThunk ('product/getProductById',
async (id: number, thunkAPI) => {

  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Set the headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the API request to fetch the product by ID
    const response = await URL.get(
      `/product/2`,
      config
    );

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}
);
export const updateProduct = createAsyncThunk(
  'cogito/UpdateProduct',
  async (data: any) => {
    try {
      const token = localStorage.getItem('token')
      console.log("received",data)
      const response = await URL.put('/product/2', data, {
       headers:{
         Authorization: `Bearer ${token}`
       }
      }); 
      return response.data;
    } catch (error) {
     throw new Error("error");
    }
  }
);
export default updateProduct;