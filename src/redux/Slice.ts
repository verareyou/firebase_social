import { createSlice } from "@reduxjs/toolkit";
import { LightTheme, DarkTheme } from "../constants/Colors";
import { UserProps } from "../models/UserModel";

const initialState = {
    user: {
        uid: "",
        email: "",
        name: "",
        username: "",
        profileImage: "",
        createdAt: 0,
        bio: "",
        website: "",
        Followers: [],
        Following: [],
        Posts: [],
    },
    isAuth: false,
    // name: "himanshu",
    theme: DarkTheme,
    ProfileUpdateListener: 1242,
    PostUpdateListener: 1242,
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
        },
        setProfileListener: (state) => {
            state.ProfileUpdateListener = Math.random() * 1000;
        },
        setPostListener: (state) => {
            state.PostUpdateListener = Math.random() * 1000;
        },

    }
});

export const { SetUser, SetAuth, SetTheme, setPostListener, setProfileListener } = slice.actions;

export default slice.reducer;