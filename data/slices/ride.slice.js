// import _default from "@expo/vector-icons/build/Feather";
import { createSlice } from "@reduxjs/toolkit";

const ridesSlice = createSlice({
    name: 'userRides',
    initialState: {
        rideLater: [],
        pastRides: [],
    },
    reducers: {
        clearState(state) {
            state.rideLater = [];
            return state;
        },
        updateRideLater(state, action) {
            state.rideLater = [...state.rideLater, action.payload]
            return state;
        }
    }
});

export const { updateRideLater, clearState} = ridesSlice.actions;
export default ridesSlice.reducer;
