import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import listBookSlice from "./book/listBookSlice";
import cartSlice from "./book/cartSlice";
import profileSlice from "./book/profileSlice";

const rootReducers = combineReducers({
  listBook: listBookSlice,
  cart: cartSlice,
  profile: profileSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    version: 1,
    whitelist: ["listBook", "profile"],
  },
  rootReducers
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "prod" ? false : true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, persistor };
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
