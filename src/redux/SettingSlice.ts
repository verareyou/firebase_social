import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    SeletedSetting: "Account"

}

const SettingSlice = createSlice({
    name: "Setting",
    initialState,
    reducers: {
        SetSelectedSetting: (state, action) => {
            state.SeletedSetting = action.payload;
        }
    }
})

export const { SetSelectedSetting } = SettingSlice.actions;

export default SettingSlice.reducer;