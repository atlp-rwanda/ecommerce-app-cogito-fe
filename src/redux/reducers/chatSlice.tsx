import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMessages, sendMessageAsync } from "../action/chatAtion";
import { Message } from "@/types/chatTypes";

const initialState = {
    messages: [] as Message[], // Update the initial state type
    loading: false,
    error: false,
  }; 

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(sendMessageAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(sendMessageAsync.fulfilled, (state, action: PayloadAction<Message>) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessageAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default chatSlice.reducer;
