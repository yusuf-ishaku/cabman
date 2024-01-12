// import _default from "@expo/vector-icons/build/Feather";
import { createSlice } from "@reduxjs/toolkit";

const userLocationSlice = createSlice({
    name: 'userLocation',
    initialState: {
        location: null
    },
    reducers: {
        setLocation(state, action){
            state.location = action.payload;
           return state;
        }
    }
});

export const { setLocation } = userLocationSlice.actions;
export default userLocationSlice.reducer;
