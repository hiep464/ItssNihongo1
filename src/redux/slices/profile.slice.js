import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        isUpdated: false,
        data: null,
    },
    reducers: {
        changeIsUpdate: (state, action) => {
            state.isUpdated = action.payload
        },
        saveProfileInfo: (state, action) => {
            state.data = action.payload
        },
        clearProfile: (state) => {
            state.isUpdated = false;
            state.data = null;
        }
    }
})

export const { changeIsUpdate, clearProfile, saveProfileInfo } = profileSlice.actions;
export default profileSlice.reducer