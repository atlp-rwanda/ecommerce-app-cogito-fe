import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import { Message } from '@/types/chatTypes';

interface SendMessagePayload {
    sender: string;
    message: string;
  }
  

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
  try {
    const response = await URL.get('/chat/messages/all');
    const messagesData = response.data.data;
    return messagesData;
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
});

export const sendMessageAsync = createAsyncThunk<Message, SendMessagePayload >('chat/sendMessageAsync', async ({ sender, message }) => {
  try {
    const response = await URL.post('/chat/messages/send', { sender, message });
    const newMessage = response.data.data;
    return newMessage;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
