import axios from "axios"
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice"
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";
import { getProductsFailed, getProductsStart, getProductsSuccess } from "./productSlice";
import 
{getCartFailed, getCartStart, getCartSuccess, addCartFailed, addCartStart, addCartSuccess
} from "./cartSlice"

export const loginUser = async(user, dispatch, navigate) => {
    
    dispatch(loginStart());
    try {
        console.log(user);
        const res = await axios.post("http://localhost:8080/auth/login", user)  
          dispatch(loginSuccess(res.data));
        navigate("/")
    } catch (err) {
        // alert(err.response.data)
        dispatch(loginFailed());
        throw new Error(err.response.data);

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

// export const getAllProducts = async (accesstoken, dispatch) =>{
    export const getAllProducts = async (dispatch) =>{
    dispatch(getProductsStart());
    // console.log(accesstoken);
    try{
        const res = await axios.get("http://localhost:8080/product",{
            // headers: {token:`Bearer ${accesstoken}`}
        })
        dispatch(getProductsSuccess(res.data))
    }catch(err){
        dispatch(getProductsFailed());
    }
}

export const addToCart = async (userid,productid, dispatch, navigate) =>{
    dispatch(addCartStart());
    // console.log(productid.toString());
    try{
        console.log(productid)
        const res = await axios.post("http://localhost:8080/cart/" + userid,productid   
        )
        dispatch(addCartSuccess(res.data))
    }catch(err){
        dispatch(addCartFailed());
    }
}

export const getCart = async (userid,dispatch) =>{
    dispatch(getCartStart());
    // console.log(accesstoken);
    try{
        const res = await axios.get("http://localhost:8080/cart/" + userid,{
            // headers: {token:`Bearer ${accesstoken}`}
        })
        dispatch(getCartSuccess(res.data))
    }catch(err){
        dispatch(getCartFailed());
    }
}