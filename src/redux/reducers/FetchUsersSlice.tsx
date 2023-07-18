import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../action/FetchUsersAction';
interface IndexState {
  status: number | null;
  message: string | undefined;
  isLoading: boolean;
  error: boolean;
  data: any;
}

const initialState: IndexState = {
  status: null,
  message: '',
  isLoading: false,
  error: false,
  data: [],
};

const fetchUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        const { message } = action.error;
        state.error = true;
        state.isLoading = false;
        state.message = message;
      });
  },
});
export default fetchUsersSlice.reducer;
