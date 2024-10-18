import { config } from "../../assets/js/config";
import { client } from "../../assets/js/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
const { SERVER_API } = config;
client.setUrl(SERVER_API);
export const userLogin = createAsyncThunk(
    "auth/login",
    async (email, { rejectWithValue }) => {
        try {
            const { data } = await client.get(`/api-key?email=${email}`);
            if (data.status_code !== "SUCCESS") {
                localStorage.removeItem("apiKey");
            }
            localStorage.setItem("apiKey", data.data.apiKey);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
