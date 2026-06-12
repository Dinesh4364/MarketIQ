import { createSlice } from "@reduxjs/toolkit";
import {
    registerUser,
    loginUser
}
from "./authThunk";


const userInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;


const initialState = {

    user: userInfo,

    loading: false,

    error: null

};


const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        logout: (state) => {

            state.user = null;

            localStorage.removeItem("user");

        }

    },

    extraReducers: (builder) => {

        builder

        .addCase(registerUser.pending, (state) => {

            state.loading = true;

        })

        .addCase(registerUser.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );

        })

        .addCase(registerUser.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        .addCase(loginUser.pending, (state) => {

            state.loading = true;

        })

        .addCase(loginUser.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );

        })

        .addCase(loginUser.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        });

    }

});


export const { logout } = authSlice.actions;

export default authSlice.reducer;