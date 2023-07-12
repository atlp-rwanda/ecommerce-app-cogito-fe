import { createSlice } from '@reduxjs/toolkit';
import { fetchRolePermissions } from '../action/FetchRolePermissionsAction';
interface IndexState {
  status: number | null;
  message: string | undefined;
  isLoading: boolean;
  error: boolean;
  rolesPermissions: any;
}

const initialState: IndexState = {
  status: null,
  message: '',
  isLoading: false,
  error: false,
  rolesPermissions: [],
};

const fetchUserRolesPermissions = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolePermissions.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.rolesPermissions = action.payload.data;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchRolePermissions.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchRolePermissions.rejected, (state, action) => {
        const { message } = action.error;
        state.error = true;
        state.isLoading = false;
        state.message = message;
      });
  },
});
export default fetchUserRolesPermissions.reducer;
