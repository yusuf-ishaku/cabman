import { configureStore } from "@reduxjs/toolkit";
// import { appApi } from "./apiSlices/api";
import  userLocationSlice  from "./slices/userLocation";

export const store = configureStore({
    reducer: {
        userLocation: userLocationSlice
    },
});