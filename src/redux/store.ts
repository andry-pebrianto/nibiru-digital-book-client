import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import listBookSlice from "./book/listBookSlice";
import cartSlice from "./book/cartSlice";
import profileSlice from "./book/profileSlice";

const store = configureStore({
  reducer: {
    listBook: listBookSlice,
    cart: cartSlice,
    profile: profileSlice,
  },
  devTools: process.env.NODE_ENV === "prod" ? false : true,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
