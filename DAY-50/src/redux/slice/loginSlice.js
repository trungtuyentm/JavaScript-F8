import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../actions/authActions";

const apiKey = localStorage.getItem("apiKey")
    ? localStorage.getItem("apiKey")
    : null;
const initialState = {
    isLoading: false,
    apiKey,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.apiKey = action.payload;
        });
        builder.addCase(userLogin.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default authSlice.reducer;
