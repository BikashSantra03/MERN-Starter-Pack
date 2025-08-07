
import authReducer from "../store/slices/authSlice";
import profileReducer from "../store/slices/profileSlice";
import cartReducer from "../store/slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        cart: cartReducer,
    },
});

export default appStore;
