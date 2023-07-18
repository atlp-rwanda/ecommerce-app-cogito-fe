import { createSlice } from '@reduxjs/toolkit';
import { fetchPermissions } from '../action/FetchPermissionsAction';
interface IndexState {
  status: number | null;
  message: string | undefined;
  isLoading: boolean;
  error: boolean;
  permissions: any;
}

const initialState: IndexState = {
  status: null,
  message: '',
  isLoading: false,
  error: false,
  permissions: [],
};

const fetchRolesPermissions = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.permissions = action.payload.data;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchPermissions.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        const { message } = action.error;
        state.error = true;
        state.isLoading = false;
        state.message = message;
      });
  },
});
export default fetchRolesPermissions.reducer;
