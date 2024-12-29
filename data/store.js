import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import baseApi from "./apiSlice/base.slice";
import userSlice from "./slices/user.slice";
import ridesSlice from './slices/ride.slice';
import scheme from "./slices/scheme";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userSlice,
  scheme: scheme,
  rides: ridesSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
  devTools: true,
});

export const persistor = persistStore(store);