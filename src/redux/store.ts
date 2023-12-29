import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import listBookSlice from "./book/listBookSlice";
import cartSlice from "./book/cartSlice";

const store = configureStore({
  reducer: {
    listBook: listBookSlice,
    cart: cartSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
