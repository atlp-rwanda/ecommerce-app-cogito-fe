import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
interface changeStatus {
  userId: number;
  status: string;
}
export const changeAccountStatus = createAsyncThunk('users/status', async (user: changeStatus) => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const { userId, status } = user;
    const response = await URL.put('users/status/' + userId, { status }, { headers: { Authorization: token } });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});
