import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface userCredentials {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
interface UpdatePasswordResponseData {
  data: object;
  error: null | string;
  loading: boolean;
  status: string;
}

export const handleUpdatePassword = createAsyncThunk<UpdatePasswordResponseData, userCredentials>('/updatepassword', async (userCredentials, { rejectWithValue }) => {
  const id = localStorage.getItem('User ID');
  try {
    // const credentials = JSON.stringify(userCredentials);
    const updatePasswordDataRequest = await URL.put(`/updatepassword/${id}`, userCredentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const updatePasswordDataResponse = updatePasswordDataRequest.data;
    //payload.response.data.message
    return updatePasswordDataResponse;
  } catch (error) {
    return rejectWithValue(error);
  }
});
