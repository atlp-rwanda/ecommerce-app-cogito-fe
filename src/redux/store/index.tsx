import { configureStore } from '@reduxjs/toolkit';
import IndexReducer from '@/redux/reducers/IndexSlice';

const store = configureStore({
  reducer: {
    index: IndexReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
