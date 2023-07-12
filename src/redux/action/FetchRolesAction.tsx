import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRoles = createAsyncThunk('/roles', async () => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const response = await URL.get('/role', { headers: { Authorization: token } });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});
