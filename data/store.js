import { configureStore } from "@reduxjs/toolkit";
// import { appApi } from "./apiSlices/api";
import  userLocationSlice  from "./slices/userLocation";
import scheme from "./slices/scheme";
export const store = configureStore({
    reducer: {
        userLocation: userLocationSlice,
        schemeSlice: scheme,
    },
});