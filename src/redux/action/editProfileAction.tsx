import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import DecodeToken from '../../utils/token';

interface Profile {
  name: string;
  email: string;
  gender: string;
  phone: string;
  birthdate: Date;
  preferredLanguage: string;
  preferredCurrency: string;
  billingAddress: Array<string>;
}

export const editProfile = createAsyncThunk('cogito/editProfile', async (data: Profile) => {
  try {
    const token = localStorage.getItem('token');
    const userDetails = DecodeToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (!userDetails?.id) {
      throw new Error('User ID not found');
    }
    const response = await URL.put(`/profile/${userDetails.id}`, data, config);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
