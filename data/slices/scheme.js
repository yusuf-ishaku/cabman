import { createSlice } from "@reduxjs/toolkit";

const schemeSlice = createSlice({
    name: "scheme",
    initialState: {
        scheme: "",
    },
    reducers: {
        setScheme(state, action){
            state.scheme = action.payload;
            return state;
        } 
    }
});

export const { setScheme } = schemeSlice.actions;
export default schemeSlice.reducer;