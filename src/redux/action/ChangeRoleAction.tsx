import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
interface roleData {
  roleId: number;
  userId: number;
}
export const changeRole = createAsyncThunk('/setrole', async (data: roleData) => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const response = await URL.post('/setrole', data, { headers: { Authorization: token } });

    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
});
