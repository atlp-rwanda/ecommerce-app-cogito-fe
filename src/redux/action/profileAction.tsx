import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import DecodeToken from '../../utils/token';

export const getProfile = createAsyncThunk('cogito/profile', async () => {
  try {
    const userDetails = DecodeToken();
    const response = await URL.get(`/profile/${userDetails.id}`);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
