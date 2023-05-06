import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
    name: "himanshu",
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = action.payload ? true : false;
        },
        SetAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    }
});

export const { SetUser, SetAuth } = slice.actions;
export default slice.reducer;