import { configureStore } from '@reduxjs/toolkit';
import IndexReducer from '../reducers/userSlice';
import ResetPasswordSlice from '../reducers/resetPasswordSlice';

const IndexStore = configureStore({
  reducer: {
    index: IndexReducer,
    User: ResetPasswordSlice,
  },
});
export type IndexState = ReturnType<typeof IndexStore.getState>;
export type IndexDispatch = typeof IndexStore.dispatch;
export default IndexStore;
