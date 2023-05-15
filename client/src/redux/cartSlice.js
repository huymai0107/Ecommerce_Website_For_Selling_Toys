import { createSlice } from "@reduxjs/toolkit";

    const cartSlice = createSlice({
        name: "cart",
        initialState:{
            carts:{
                allCarts: null,
                isFetching: false,
                error: false
            }
        },
        msg: "",
        reducers:{
            getCartStart: (state) =>{
                state.carts.isFetching = true;
            },
            getCartSuccess: (state, action) =>{
                state.carts.isFetching = false;
                state.carts.allCarts = action.payload;
            },
            getCartFailed: (state) =>{
                state.carts.isFetching = false;
                state.carts.error = true;
            },
            //
            addCartStart: (state) =>{
                state.carts.isFetching = true;
            },
            addCartSuccess: (state, action) =>{
                state.carts.isFetching = false;
                state.carts.allCarts = action.payload;
            },
            addCartFailed: (state) =>{
                state.carts.isFetching = false;
                state.carts.error = true;
            }
        }
    })

    export const {
        getCartStart, getCartSuccess, getCartFailed, addCartFailed, addCartStart, addCartSuccess
    } = cartSlice.actions;
    
    export default cartSlice.reducer;