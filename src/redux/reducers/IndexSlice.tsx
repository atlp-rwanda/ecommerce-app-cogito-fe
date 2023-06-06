import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchIndexMessage } from "../action/IndexAction";

interface IndexState {
    data: string; // Define your product state here
    status: string;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: IndexState = {
    data: '',
    status: '',
    loading: false,
    error: null,
  };

const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndexMessage.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchIndexMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = action.payload.status;
        state.data = action.payload.message;
        state.error = null;
      })
      .addCase(fetchIndexMessage.rejected, (state) => {
        state.loading = false;
        state.status = '500';
        state.error = 'Server Error!!!';
      });
  },
});

export default indexSlice.reducer;
