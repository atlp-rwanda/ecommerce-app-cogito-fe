import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import IndexReducer from '../reducers/IndexSlice';
import LoginReducer from '../reducers/loginSlice';
import ResetPasswordSlice from '../reducers/resetPassword/resetPasswordSlice';
import UpdatePasswordSlice from '../reducers/resetPassword/updatePassword';

const store = configureStore({
  reducer: {
    index: IndexReducer,
    login: LoginReducer,
    User: ResetPasswordSlice,
    Update: UpdatePasswordSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
