// import _default from "@expo/vector-icons/build/Feather";
import { createSlice } from "@reduxjs/toolkit";

const userLocationSlice = createSlice({
    name: 'user',
    initialState: {
        location: null,
        fullName: "",
        address: "",
        city: "",
        country: "",
        email: "",
        profilePicture: "",
        referralCode: "",
        phoneNumber: ''
    },
    reducers: {
        setLocation(state, action){
            state.location = action.payload;
           return state;
        },
        clearState(state) {
            state.location = null;
            state.fullName = "";
            state.address = "";
            state.city = "";
            state.country = "";
            state.email = "";
            state.profilePicture = "";
            state.referralCode = "";
            state.phoneNumber = '';
            return state;
        },
        updateUser(state, action) {
            Object.keys(action.payload).forEach(key => {
                if (state.hasOwnProperty(key)) {
                    state[key] = action.payload[key];
                }
            });
            return state;
        }
    }
});

export const { setLocation, updateUser, clearState} = userLocationSlice.actions;
export default userLocationSlice.reducer;
