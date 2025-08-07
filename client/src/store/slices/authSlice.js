import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    token: localStorage.getItem("Token")
        ? JSON.parse(localStorage.getItem("Token"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
    },
});


export const { setSignupData, setToken } = authSlice.actions;

export default authSlice.reducer;
