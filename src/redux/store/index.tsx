import { configureStore } from '@reduxjs/toolkit';
import IndexReducer from '../reducers/IndexSlice';

const IndexStore = configureStore({
  reducer: {
    index: IndexReducer,
  },
});
export type IndexState = ReturnType<typeof IndexStore.getState>;
export type IndexDispatch = typeof IndexStore.dispatch;
export default IndexStore;
