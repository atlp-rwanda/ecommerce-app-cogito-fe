import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMessages } from '../action/chatAtion';

interface ChatState {
  data: {
    id: number;
    sender: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  }[];
  loading: boolean;
  error: boolean;
}

const initialChatState: ChatState = {
  data: [{
    id: 0,
    sender: '',
    message: '',
    createdAt: new Date().toISOString(),
    updatedAt: '',
  }],
  loading: false,
  error: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
