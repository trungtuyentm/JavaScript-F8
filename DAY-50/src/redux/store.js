import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/loginSlice";

const rootReducer = {
    reducer: { user: authSlice.reducer },
};
export const store = configureStore(rootReducer);
