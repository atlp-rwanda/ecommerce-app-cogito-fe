import { configureStore } from '@reduxjs/toolkit';
import updateProductReducer from '../reducers/UpdateProductSlice';

const store = configureStore({
  reducer: {
    updateProduct: updateProductReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
