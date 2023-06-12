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
    posts: [],
    theme: DarkTheme,
    ProfileUpdateListener: 1242,
    PostUpdateListener: 1242,
    Loading: false
};

const userSlice = createSlice({
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
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setLoading: (state, action) => {
            state.Loading= action.payload;
        }

    }
});

export const { SetUser, SetAuth, SetTheme, setPostListener, setProfileListener, setPosts,setLoading } = userSlice.actions;

export default userSlice.reducer;