import URL from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIndexMessage = createAsyncThunk('cogito/', async () => {
  try {
    // Calling our backend index message
    const response = await URL.get('/');
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
