import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import DecodeToken from '../../utils/token';

export const handleNotifications = createAsyncThunk('/vendor/getAllNotifications', async (userDetails: any, thunkAPI) => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    userDetails = DecodeToken();
    const response = await URL.get(`/notification/${userDetails.id}`, { headers: { 'Accept-language': 'en', Authorization: token } });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const handleMarkAllNotificationAsRead = createAsyncThunk('/vendor/MarkAllNotificationsAsRead', async () => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const userDetails = DecodeToken();
    const response = await URL.get(`/notification/markAllAsRead/${userDetails.id}`, { headers: { 'Accept-language': 'en', Authorization: token } });
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});

export const handleMarkNotificationAsRead = createAsyncThunk('/vendor/MarkNotificationAsRead', async (notificationId: number, thunkAPI) => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const response = await URL.get(`/notification/markAsRead/${notificationId}`, { headers: { 'Accept-language': 'en', Authorization: token } });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

export const handleDeleteSingleNotification = createAsyncThunk('/vendor/DeleteSingleNotification', async (notificationId: number, thunkAPI) => {
  try {
    const token = 'Bearer ' + localStorage.getItem('token');
    const response = await URL.get(`/notification/deleteNotification/${notificationId}`, { headers: { 'Accept-language': 'en', Authorization: token } });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});
