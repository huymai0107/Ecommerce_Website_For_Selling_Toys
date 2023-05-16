import {getCart} from '../../redux/apiRequest'
import {useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react'

const Cart = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const cartData = useSelector((state) => state.cart.carts?.allCarts);
    const productData = useSelector((state) => state.product.products?.allProducts);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() =>{
        if(!user){
          navigate("/signin");
          return;
        }
          getCart(user?.others._id,dispatch);
       },[]);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {cartData?.items.map((cart) => {
          return (
            <div className="user-container" key ={cart._id}>
            
              <div  className="home-user">{cart.productId._id}</div>
              <div  className="home-user">{cart.quantity}</div>

            </div>
          );
        })}
      </div>
    </main>
  )
}

export default Cart
