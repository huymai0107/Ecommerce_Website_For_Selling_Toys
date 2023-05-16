import { createSlice } from "@reduxjs/toolkit";

    const getProductSlice = createSlice({
        name: "theproduct",
        initialState:{
            theproduct:{
                theproduct: null,
                isFetching: false,
                error: false
            }
        },
        reducers:{
            gettheproductStart: (state) =>{
                state.theproduct.isFetching = true;
            },
            gettheproductSuccess: (state, action) =>{
                state.theproduct.isFetching = false;
                state.theproduct.theproduct = action.payload;
            },
            gettheproductFailed: (state) =>{
                state.theproduct.isFetching = false;
                state.theproduct.error = true;
            }
        }
    })

    export const {
        gettheproductFailed, gettheproductStart,gettheproductSuccess
    } = getProductSlice.actions;
    
    export default getProductSlice.reducer;