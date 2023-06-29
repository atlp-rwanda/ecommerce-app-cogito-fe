import { configureStore } from '@reduxjs/toolkit';
import UpdatePasswordReducer from '../reducers/UpdatePasswordSlice';

const UpdatePasswordStore = configureStore({
  reducer: {
    updatePassword: UpdatePasswordReducer,
  },
});
export type UpdatePasswordState = ReturnType<typeof UpdatePasswordStore.getState>;
export type UpdatePasswordDispatch = typeof UpdatePasswordStore.dispatch;
export default UpdatePasswordStore;
