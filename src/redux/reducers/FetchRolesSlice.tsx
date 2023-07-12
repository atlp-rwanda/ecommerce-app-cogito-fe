import { createSlice } from '@reduxjs/toolkit';
import { fetchRoles } from '../action/FetchRolesAction';
interface IndexState {
  status: number | null;
  message: string | undefined;
  isLoading: boolean;
  error: boolean;
  roles: any;
}

const initialState: IndexState = {
  status: null,
  message: '',
  isLoading: false,
  error: false,
  roles: [],
};

const fetchUsersRoles = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.roles = action.payload.data;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        const { message } = action.error;
        state.error = true;
        state.isLoading = false;
        state.message = message;
      });
  },
});
export default fetchUsersRoles.reducer;
