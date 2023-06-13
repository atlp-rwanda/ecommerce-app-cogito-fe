import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from '../reducers/loginSlice';

<<<<<<< HEAD

=======
>>>>>>> f668d53 (feat(login with email): worked on login using email and password)
const LoginStore = configureStore({
  reducer: {
    login: LoginReducer,
  },
});
export type LoginState = ReturnType<typeof LoginStore.getState>;
export type LoginDispatch = typeof LoginStore.dispatch;
export default LoginStore;
