import { createSlice } from "@reduxjs/toolkit";

    const orderSlice = createSlice({
        name: "order",
        initialState:{
            orders:{
                allOrders: null,
                isFetching: false,
                error: false
            }

        },
        reducers:{
            getOrderStart: (state) =>{
                state.orders.isFetching = true;
            },
            getOrderSuccess: (state, action) =>{
                state.orders.isFetching = false;
                state.orders.allOrders = action.payload;
            },
            getOrderFailed: (state) =>{
                state.orders.isFetching = false;
                state.orders.error = true;
            },
            //
            addOrderStart: (state) =>{
                state.orders.isFetching = true;
            },
            addOrderSuccess: (state, action) =>{
                state.orders.isFetching = false;
                state.orders.allOrders = action.payload;
            },
            addOrderFailed: (state) =>{
                state.orders.isFetching = false;
                state.orders.error = true;
            },
            //
            updateOrderStart: (state) =>{
                state.orders.isFetching = true;
            },
            updateOrderSuccess: (state, action) =>{
                state.orders.isFetching = false;
                state.orders.allOrders = action.payload;
            },
            updateOrderFailed: (state) =>{
                state.orders.isFetching = false;
                state.orders.error = true;
            },
            //
            // rmItemOrderStart: (state) =>{
            //     state.orders.isFetching = true;
            // },
            // rmItemOrderSuccess: (state, action) =>{
            //     state.orders.isFetching = false;
            //     state.orders.allOrders = action.payload;
            // },
            // rmItemOrderFailed: (state) =>{
            //     state.orders.isFetching = false;
            //     state.orders.error = true;
            // }
            

        }
    })

    export const {
        getOrderFailed,
        getOrderStart,
        getOrderSuccess,
        addOrderFailed,
        addOrderStart,
        addOrderSuccess,
        updateOrderFailed,
        updateOrderStart,
        updateOrderSuccess
    } = orderSlice.actions;
    
    export default orderSlice.reducer;