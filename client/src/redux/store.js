import { configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import userReducer from "./userSlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import theproductReducer from "./theSpecificProductSiice"
export default configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        theproduct: theproductReducer

    }
})