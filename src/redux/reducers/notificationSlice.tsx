import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { handleNotifications, handleMarkAllNotificationAsRead, handleMarkNotificationAsRead, handleDeleteSingleNotification } from '../action/notificationAction';

interface noticeData {
  data: [] | null;
  status: number | null;
  loading: boolean;
  error: boolean;
  markAllAsReadMessage: string;
  message: string;
}

const initialState: noticeData = {
  data: null,
  status: null,
  loading: false,
  error: false,
  markAllAsReadMessage: '',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleNotifications.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.error = false;
        state.data = null;
      })
      .addCase(handleNotifications.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = action.payload.status;
        state.error = false;
        state.data = action.payload.notifications;
      })
      .addCase(handleNotifications.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = action.payload.status;
        state.error = true;
        state.data = action.payload.error;
      })
      .addCase(handleMarkAllNotificationAsRead.pending, (state) => {
        state.markAllAsReadMessage = '';
      })
      .addCase(handleMarkAllNotificationAsRead.fulfilled, (state, action: PayloadAction<any>) => {
        state.markAllAsReadMessage = action.payload.message;
      })
      .addCase(handleMarkAllNotificationAsRead.rejected, (state, action: PayloadAction<any>) => {
        state.markAllAsReadMessage = action.payload.error;
      })
      .addCase(handleMarkNotificationAsRead.pending, (state) => {
        state.markAllAsReadMessage = '';
      })
      .addCase(handleMarkNotificationAsRead.fulfilled, (state, action: PayloadAction<any>) => {
        state.markAllAsReadMessage = action.payload.message;
      })
      .addCase(handleMarkNotificationAsRead.rejected, (state, action: PayloadAction<any>) => {
        state.markAllAsReadMessage = action.payload;
      })
      .addCase(handleDeleteSingleNotification.pending, (state) => {
        state.markAllAsReadMessage = '';
      })
      .addCase(handleDeleteSingleNotification.fulfilled, (state, action: PayloadAction<any>) => {
        state.markAllAsReadMessage = action.payload.message;
      })
      .addCase(handleDeleteSingleNotification.rejected, (state, action: PayloadAction<any>) => {
        state.markAllAsReadMessage = action.payload;
      });
  },
});
export const notificationSliceAction = notificationSlice.actions;
export default notificationSlice.reducer;
