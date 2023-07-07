import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: localStorage.getItem("isLogin") || false,
        userId: localStorage.getItem("userId"),
        user_info: null,
        booking: null,
        username: null,
        status: null,
    },
    reducers: {
        saveUserInfo: (state, action) => {
            const { id, account_status, user_info, username, booking } = action.payload;
            state.booking = booking;
            state.isLogin = true;
            state.status = account_status;
            state.userId = id;
            state.user_info = user_info;
            state.username = username;
            localStorage.setItem('userId', id);
            localStorage.setItem('isLogin', true);
        },

        logout: (state) => {
            localStorage.clear();
            state.isLogin = false;
            state.userId = null;
            state.profile = null;
        }
    }
})

export const { logout, saveUserInfo } = authSlice.actions;
export default authSlice.reducer