import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginWithGoogle = createAsyncThunk('googleLogin', async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Reached Here!!! 006, My Token: ', token);
      return { token };
    } catch (error) {
      return rejectWithValue(error);
    }
  });