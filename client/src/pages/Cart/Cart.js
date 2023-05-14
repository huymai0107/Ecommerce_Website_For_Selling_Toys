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
        // console.log(cartData.items)
        console.log(user);
        if(!user){
          navigate("/signin");
        }
          getCart(user.others?._id,dispatch);
       },[]);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {/* {userData?.map((user) => {
          return (
            <div className="user-container" key ={user._id}>
              <div  className="home-user">{user.username}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })} */}

        {/* {cartData.items.map((cart) => {
          return (
            <div className="user-container" key ={cart.productId}>
         </div>
          );
        })} */}
        
      </div>
    </main>
    // <>
    //     <h1>{cartData.items.productId}</h1>
    // </>
  )
}

export default Cart
