import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducers/product';
import cartSlice from './reducers/cart';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import navigationSlice from './reducers/navigation';

const store = configureStore({
  reducer: {
    cartInfo: cartSlice.reducer,
    productsInfo: productSlice.reducer,
    navigation: navigationSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store };
