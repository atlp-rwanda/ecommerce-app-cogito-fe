import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import IndexReducer from '../reducers/IndexSlice';
import LoginReducer from '../reducers/loginSlice';

const store = configureStore({
  reducer: {
    index: IndexReducer,
    login: LoginReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;