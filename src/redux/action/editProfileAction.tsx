import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface Profile {
  name: string;
  email: string;
  gender: string;
  //   phone: string;
  birthdate: Date;
  preferredLanguage: string;
  preferredCurrency: string;
  billingAddress: Array<string>;
}

export const editProfile = createAsyncThunk('cogito/editProfile', async (data: Profile) => {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrdW5kYWFnZ3lAZXhhbXBsZS5jb20iLCJuYW1lIjoiQWduZXMgS3VuZGEiLCJyb2xlSWQiOjMsImlhdCI6MTY4NzE4MTI3NSwiZXhwIjoxNjg3MjY3Njc1fQ.gmN71wIj8XDJn3qP5D0h2ISz_6SQad3aPlQ6KGRTZ4k';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the 'Authorization' header
      },
    };
    const response = await URL.put('/profile/3', data, config);
    console.log('hereee');
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});
