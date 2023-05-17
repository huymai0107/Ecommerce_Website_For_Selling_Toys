import axios from "axios"
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice"
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";
import { getProductsFailed, getProductsStart, getProductsSuccess } from "./productSlice";
import 
{getCartFailed, getCartStart, getCartSuccess, addCartFailed, addCartStart, addCartSuccess, clearCartFailed, clearCartSuccess, clearCartStart, rmItemCartFailed, rmItemCartStart,rmItemCartSuccess
} from "./cartSlice"
import { gettheproductFailed, gettheproductStart,gettheproductSuccess } from "./getProductSlice";

export const loginUser = async(user, dispatch, navigate) => {
    
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8080/auth/login", user)  
          dispatch(loginSuccess(res.data));
    } catch (err) {
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
//CART
export const addToCart = async (accesstoken,userid,productid, dispatch, navigate) =>{
    dispatch(addCartStart());
    try{
        const res = await axios.post("http://localhost:8080/cart/" + userid,productid,{
            headers: {token:`Bearer ${accesstoken}`}
        }   
        )
        dispatch(addCartSuccess(res.data))
    }catch(err){
        dispatch(addCartFailed());
    }
}

export const getCart = async (userid,accesstoken,dispatch) =>{
    dispatch(getCartStart());
    // console.log(accesstoken);
    try{
        const res = await axios.get("http://localhost:8080/cart/" + userid,{
            headers: {token:`Bearer ${accesstoken}`}
        })
        dispatch(getCartSuccess(res.data))
    }catch(err){
        dispatch(getCartFailed());
    }
}

export const clearCart = async (accesstoken,userid,dispatch) =>{
    dispatch(clearCartStart());
    // console.log(accesstoken);
    try{
        const res = await axios.delete("http://localhost:8080/cart/" + userid,{
            headers: {token:`Bearer ${accesstoken}`}
        })
        dispatch(clearCartSuccess(res.data))
    }catch(err){
        dispatch(clearCartFailed());
    }
}
export const rmItemCart = async (accesstoken,userid,itemid,dispatch) =>{
    dispatch(rmItemCartStart());
    try{
        const res = await axios.delete("http://localhost:8080/cart/" + userid +"/"+itemid.id.toString(),{
            headers: {token:`Bearer ${accesstoken}`}
        })
        dispatch(rmItemCartSuccess(res.data))
    }catch(err){
        dispatch(rmItemCartFailed());
    }
}


//PRODUCT
export const getProductById = async (id,dispatch) =>{
    dispatch(gettheproductStart());
    // console.log(accesstoken);
    try{
        const res = await axios.get("http://localhost:8080/product/" + id.id.toString(),{
            // headers: {token:`Bearer ${accesstoken}`}
        })
        // console.log(res.data)
        dispatch(gettheproductSuccess(res.data))
        
    }catch(err){
        dispatch(gettheproductFailed());
    }
}

