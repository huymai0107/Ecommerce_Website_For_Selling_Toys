import {getCart} from '../../redux/apiRequest'
import {useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { clearCart, rmItemCart } from '../../redux/apiRequest';
import { Button } from '@mui/material';

const Cart = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const cartData = useSelector((state) => state.cart.carts?.allCarts);
    const productData = useSelector((state) => state.product.products?.allProducts);
    const [error,setError]=useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() =>{
        if(!user){
          navigate("/signin");
          return;
        }
        // try {
          if(user?.accessToken)
          getCart(user?.others._id,user?.accessToken,dispatch);
       },[]);
        //HANDLE CLEAR CART 
        function handleClearCart() {

                if(user?.accessToken)
                  {   
                  clearCart(user.accessToken,user.others._id,dispatch, navigate)}
          }
        //HANDLE REMOVE EACH ITEM FROM CART
        function handleRemove(id) {
          const newItem ={
              id: id,
            }
                if(user?.accessToken)
                  {   
                  rmItemCart(user.accessToken,user.others._id,newItem,dispatch)
          }
        }
             
  return (
    <main>
      {error?<label>{error}</label>:null}          
      <div >
        {cartData?.items.map((item) => {
          return (
            <div key ={item._id}>
              <h1>{item.productId.name}</h1>
              <p>{item.quantity}</p>
              <p>{item.productId.price}</p>
              <button onClick={() => handleRemove(item._id)}>removeItem</button>
            </div>

          );
        })}
        <button onClick={() => handleClearCart()}>clearCart</button>

      </div>
    </main>
  )
}

export default Cart
