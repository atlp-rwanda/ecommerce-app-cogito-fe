import { configureStore } from '@reduxjs/toolkit';
import IndexReducer from '../reducers/IndexSlice';
import ResetPasswordSlice from '../reducers/resetPasswordSlice';

const store = configureStore({
  reducer: {
    index: IndexReducer,
    User: ResetPasswordSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
