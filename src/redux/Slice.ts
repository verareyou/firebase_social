import { createSlice } from "@reduxjs/toolkit";
import { LightTheme, DarkTheme } from "../constants/Colors";

const initialState = {
    user: null,
    isAuth: false,
    name: "himanshu",
    theme: DarkTheme,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload ? action.payload : state.user;
            state.isAuth = action.payload ? true : false;
        },
        SetAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        SetTheme: (state) => {
            state.theme = state.theme.mode === "light" ? DarkTheme : LightTheme;
        }
    }
});

export const { SetUser, SetAuth, SetTheme } = slice.actions;

export default slice.reducer;