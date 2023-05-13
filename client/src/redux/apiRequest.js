import axios from "axios"
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice"
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";


export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        console.log(user);
        const res = await axios.post("http://localhost:8080/auth/login", user)  

          dispatch(loginSuccess(res.data));
        navigate("/")
    } catch (err) {
        console.log(err)
        dispatch(loginFailed());
    }
}

export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("http://localhost:8080/auth/register", user);
        dispatch(registerSuccess(res.data));
        navigate("/signin")
    } catch (err) {
        dispatch(registerFailed());
    }
}

export const getAllUsers = async (accesstoken, dispatch) =>{
    dispatch(getUsersStart());
    // console.log(accesstoken);
    try{
        const res = await axios.get("http://localhost:8080/user/getall",{
            headers: {token:`Bearer ${accesstoken}`}
        })
        dispatch(getUsersSuccess(res.data))
    }catch(err){
        dispatch(getUsersFailed());
    }
}