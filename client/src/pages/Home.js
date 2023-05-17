import Item from '../component/Item/Item'
import React, { useEffect, useState } from 'react'
import {getCart, addToCart, getAllProducts, getAllUsers } from '../redux/apiRequest'
import {useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";

function Home() {
    const user = useSelector((state) => state.auth.login.currentUser);
    // console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const userData = useSelector((state) => state.user.users?.allUsers);
    const productData = useSelector((state) => state.product.products?.allProducts);
    // const [productId, setproductId] = useState('');

    function handleAddProduct(id) {
      const newItem ={
        productId: id,
      }
      addToCart(user.others._id,newItem,dispatch, navigate,)

    }

  //GET ALL PRODUCTS
  useEffect(() =>{
    if(!user){
      // navigate("/signin");
    }
      getAllProducts(dispatch);
  },[]);
  // GET ALL USERS
  //  useEffect(() =>{
  //   if(!user){
  //     navigate("/signin");
  //   }
  //   if(user?.accessToken)
  //   { 
  //     getAllUsers(user?.accessToken, dispatch);}
  //  },[]);
  return (
    <div><Item/></div>
  )
}

export default Home