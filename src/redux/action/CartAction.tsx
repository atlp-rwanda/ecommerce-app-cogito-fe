import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface cartValues {
  itemId:number,
  neededQuantity: number,
}
export const fetchCart =  createAsyncThunk('/cart',async () => {
    try {
        const token = 'Bearer ' + localStorage.getItem('token');
        const response = await URL.get('/cart', {headers:{Authorization:token}});
      
        return response.data;
    } catch (error:any) {
        throw error.response.data.message;
    }
})
export const empty = createAsyncThunk('cart/deleteAll', async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await URL.delete(`/cart/clear`, config);
      return response.data;
    } catch (error) {
      throw new Error('error');
    }
  });
export const addCart = createAsyncThunk('cart/add', async (productId:number) =>{
  try {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await URL.post(`/products/cart/add/${productId}`,undefined, config);
  return response.data;
} catch (error) {
  throw new Error('error');
}})
export const incrementDecrement = createAsyncThunk('cart/incrementDecrement', async (cartInfo:cartValues) =>{
  try {
  const token = localStorage.getItem('token');
  const {itemId, neededQuantity} = cartInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await URL.put(`/cart/${itemId}`,{neededQuantity}, config);
  return response.data;
} catch (error) {
  throw new Error('error');
}})

