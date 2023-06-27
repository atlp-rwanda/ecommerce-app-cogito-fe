import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import LoginReducer from '../reducers/loginSlice';
import ResetPasswordSlice from '../reducers/resetPassword/resetPasswordSlice';
import UpdatePasswordSlice from '../reducers/resetPassword/updatePassword';
import userReducer from '../reducers/userSlice';
import tfaReducer from '../reducers/TfaSlice';
import getOtpReducer from '../reducers/GetOtpSlice';

const store = configureStore({
  reducer: {
    login: LoginReducer,
    User: ResetPasswordSlice,
    Update: UpdatePasswordSlice,
    user: userReducer,
    tfa: tfaReducer,
    getOtp: getOtpReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
