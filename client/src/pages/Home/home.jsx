import React, { useEffect, useState } from 'react'
import {getCart, addToCart, getAllProducts, getAllUsers } from '../../redux/apiRequest'
import {useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";
import "./home.css"
import Item from "../../component/Item/Item"
// const home = () => {
//   const dispatch = () => useDispatch();
//   const user = useSelector((state) => state.auth.login.currentUser);
//  useEffect(() =>{
//   getAllUsers(user.accessToken, dispatch);
//  },[])
//   return (
//     <div>
//       <h1>HOME</h1>
//       {user.username}
//     </div>
//   )
// }

// export default home


const HomePage = () => {
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
 
  return (<>
    {/* <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">

        {productData?.map((product) => {
          return (
            <div className="user-container" key ={product._id}>
              <div  className="home-user">{product.name}</div>
              <button className="delete-user" onClick={() => handleAddProduct(product._id)}> add </button>
            </div>
          );
        })}
      </div>
    </main> */}
    <Item/>
  </>

  );
};

export default HomePage;
