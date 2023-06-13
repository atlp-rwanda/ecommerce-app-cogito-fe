import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from '../reducers/loginSlice';


const LoginStore = configureStore({
  reducer: {
    login: LoginReducer,
  },
});
export type LoginState = ReturnType<typeof LoginStore.getState>;
export type LoginDispatch = typeof LoginStore.dispatch;
export default LoginStore;
