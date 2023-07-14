import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import LoginReducer from '../reducers/loginSlice';
import ResetPasswordSlice from '../reducers/resetPassword/resetPasswordSlice';
import UpdatePasswordSlice from '../reducers/resetPassword/updatePassword';
import userReducer from '../reducers/userSlice';
import tfaReducer from '../reducers/TfaSlice';
import getOtpReducer from '../reducers/GetOtpSlice';
import UpdatePasswordReducer from '../reducers/UpdatePasswordSlice';
import ProfileReducer from '../reducers/profileSlice';
import CategoryReducer from '../reducers/categorySlice';
import googleLoginReducer from '../reducers/googleLoginSlice';
import addProductReducer from '../reducers/Product/ProductSlice';
import AllProductReducer from '../reducers/Product/fetchSlice';
import fetchViewReducer from '../reducers/viewProductSlice';
import updateProductReducer from '../reducers/updateProductSlice'
import notificationReducer from '../reducers/notificationSlice';

const store = configureStore({
  reducer: {
    login: LoginReducer,
    User: ResetPasswordSlice,
    Update: UpdatePasswordSlice,
    user: userReducer,
    tfa: tfaReducer,
    getOtp: getOtpReducer,
    updatePassword: UpdatePasswordReducer,
    profile: ProfileReducer,
    category: CategoryReducer,
    googleLogin: googleLoginReducer,
    products: addProductReducer,
    Allproducts: AllProductReducer,
    viewProduct: fetchViewReducer,
    updateProduct: updateProductReducer,
    notification: notificationReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
