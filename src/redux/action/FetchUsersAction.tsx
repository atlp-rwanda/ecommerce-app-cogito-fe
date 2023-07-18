import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('/users', async () => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const response = await URL.get('users', { headers: { Authorization: token } });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});
