import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import DecodeToken from '../../utils/token';

export const getAllRecommendedProducts = createAsyncThunk('products/recommended', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const userDetails = DecodeToken();
    const roleId = localStorage.getItem('roleId');
    if(roleId && parseInt(roleId) === 3){
      const response = await URL.get(`/products/recommended/${userDetails.id}`, config );
      return response.data;
    }
   
  } catch (error) {
    return error;
  }
});
