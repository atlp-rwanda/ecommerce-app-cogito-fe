import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './../action/categoryAction';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    value: [],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const { actions, reducer } = categorySlice;
export default categorySlice.reducer;
