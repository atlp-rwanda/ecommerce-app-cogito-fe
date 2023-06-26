import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from '../reducers/loginSlice';
import IndexReducer from '@/redux/reducers/IndexSlice';

const LoginStore = configureStore({
  reducer: {
    login: LoginReducer,
    index: IndexReducer,
  },
});
export type LoginState = ReturnType<typeof LoginStore.getState>;
export type LoginDispatch = typeof LoginStore.dispatch;
export default LoginStore;
