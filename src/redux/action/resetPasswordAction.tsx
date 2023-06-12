import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/api/';

export const resetPassword = createAsyncThunk('user/resetPassword', async (email: string, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}reset/password`, { email });

    // Store the token in a cookie
    document.cookie = `token=${response.data.token}; path=/;`;

    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});
