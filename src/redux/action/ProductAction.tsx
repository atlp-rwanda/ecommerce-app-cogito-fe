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
    const response = await URL.get('/seller/items', config);
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

export const ViewProduct = createAsyncThunk('view/product', async({id}: any) => {
    try{
       const token = localStorage.getItem('token'
       )
       const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       }
       const response = await URL.get(`/product/${id}`, config);
       return response.data;
    }catch(error: any){
        throw error.response.data.message;
    }
})

export const updateProduct = createAsyncThunk('edit/product', async({id, data}: any)=>{
  try{
    const token = localStorage.getItem('token');
    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
     }
     const response = await URL.put(`/product/${id}`, data, config);
     console.log('my token',config)
     return response.data;
  }catch(error: any){
    throw error.response.data.message;
}
}) 
