import axios from "axios"
import { loginFailed, loginStart, loginSuccess } from "./authSlice"
import { Navigate } from "react-router-dom"


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = axios.post("http://localhost:8080/auth/login", user);
        dispatch(loginSuccess(res.data));
        // Navigate("/")
    } catch (err) {
        dispatch(loginFailed());
    }
}