import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch } from '../store/store'
// import { RootState } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<AppDispatch> = useSelector;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
