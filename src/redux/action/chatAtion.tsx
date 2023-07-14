import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';


export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async () => {
    try {
      const response = await URL.get('/chat/messages/all');
      return response.data
    } catch (error: any) {
      throw error.response.data.message
    }
  }
);