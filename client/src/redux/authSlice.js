import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:{
            currentUser: null,
            isFetching:false,
            error: false,
        },

        register:{
            isFetching:false,
            error: false,
            success: false
        },
        logout:{
            isFetching:false,
            error: false
                },

    },
    reducers:{
        loginStart: (state) =>{
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;

        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.msg = action.payload;
        },

        logoutSuccess: (state) => {
            state.login.currentUser = null;
        },

        registerStart: (state) =>{
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;

        },
        registerFailed: (state, action) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },


    }
})

export const {
    loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess, logoutSuccess
} = authSlice.actions;

export default authSlice.reducer