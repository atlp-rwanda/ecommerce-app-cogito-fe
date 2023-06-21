import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from '../categorySlice';
import URL from '../../../utils/api';
import { getCategories } from "../../action/categoryAction";

describe('getCategories Action', () => {
  test('should dispatch get categories action correctly', async () => {
    const store = configureStore({
      reducer: CategoryReducer,
    });
    const getSpy = jest.spyOn(URL, 'get').mockResolvedValueOnce({
      data: { data: { status: 200, message: 'all-categories', data:[{
        "id": 1,
        "name": "Fashion",
        "image": "https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg",
        "createdAt": "2023-06-26T19:04:27.854Z",
        "updatedAt": "2023-06-26T19:04:27.854Z"
      },] } },
    });
    await store.dispatch(getCategories());
    expect(getSpy).toBeCalledWith(`/category`)
    });
  });
