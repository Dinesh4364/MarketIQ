import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    registerUserAPI,
    loginUserAPI
}
from "./authAPI";


export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {

        try {

            return await registerUserAPI(userData);

        }
        catch (error) {

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );

        }

    }
);


export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {

        try {

            return await loginUserAPI(userData);

        }
        catch (error) {

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );

        }

    }
);