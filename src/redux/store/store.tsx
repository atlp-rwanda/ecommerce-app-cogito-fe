import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartSlice';
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
import fetchViewReducer from '../reducers/viewProductSlice';
import fetchUsersReducer from '../reducers/FetchUsersSlice';
import changeStatus from '../reducers/AccountStatusSlice';
import fetchRoles from '../reducers/FetchRolesSlice';
import changeUserRole from '../reducers/ChangeRoleSlice';
import fetchPermissions from '../reducers/FetchPermissionsSlice';
import fetchRolePermissions from '../reducers/RolePermissionsSlice';
import chatReducer from '../reducers/chatSlice';
import cartItemsReducer from '../reducers/Product/cartViewSlice';

import updateProductReducer from '../reducers/updateProductSlice';
import notificationReducer from '../reducers/notificationSlice';
import searchReducer from '../reducers/searchSlice';
import fetchSlice from '../reducers/Product/fetchSlice';
import recommendedReducer from '../reducers/recommendedProductsSlice';
import getOrderStatusReducer from '../reducers/Product/orderStatusSlice';
import allProductsReducer from '../reducers/products';
import wishlistReducer from '../reducers/wishlistSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the cart reducer
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
    Allproducts: fetchSlice,
    viewProduct: fetchViewReducer,
    updateProduct: updateProductReducer,
    notification: notificationReducer,
    users: fetchUsersReducer,
    accountStatus: changeStatus,
    roles: fetchRoles,
    change_role: changeUserRole,
    permissions: fetchPermissions,
    rolesPermissions: fetchRolePermissions,
    chat: chatReducer,
    cartItems: cartItemsReducer,
    allProducts: allProductsReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
    recommended: recommendedReducer,
    orderStatus: getOrderStatusReducer,
  },
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
