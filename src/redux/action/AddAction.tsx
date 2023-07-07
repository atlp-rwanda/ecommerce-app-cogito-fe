import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export const addProduct = createAsyncThunk('product/addProduct', async ({ productData, setLoading }: any, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await URL.post('/products/add', productData, config);
    console.log(response);
    setLoading(false);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Unable to add product');
    }
  } catch (error) {
    console.log(error);
    setLoading(false);

    return thunkAPI.rejectWithValue(error);
  }
});
