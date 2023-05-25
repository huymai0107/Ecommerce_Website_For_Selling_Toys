import {  AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Component } from "react";
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {useDispatch, useSelector } from "react-redux"
import {Link,useNavigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { warn } from '../../util/Warn';
import {
  getCart,
  addToCart,
  getAllProducts,
  getAllUsers,
  searchProduct,
} from "../../redux/apiRequest"; 
import { success } from '../../util/Success';
import { convertBufferToBase64 } from '../../util/convertBufferToBase64';


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const ContainerForEachItems = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Item = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [selectedCategory, setSelectedCategory] = useState("ALL");
        const productData = useSelector((state) => state.product.products?.allProducts);
        const user = useSelector((state) => state.auth.login?.currentUser);
        function handleSearch(category) {
          setSelectedCategory(category);
        }
        
        function handleSearch(search){
          if(search === ""){
            getAllProducts(dispatch);
          }
          console.log("Yes");
          searchProduct(dispatch, search);
        }
        //HANDLE ADD PRODUCT TO CART
        function handleAddProduct(id) {
            const newItem ={
                productId: id,
              }
            if(!user)
            {
                navigate("/signin");
            }
            else {
                  if(user?.accessToken)
                    {   
                    addToCart(user.accessToken,user.others._id,newItem,dispatch, navigate,)
                    success("Added");}
                else {
                    warn("Fail added");
                }
            }
          }
        //GET ALL PRODUCTS
        useEffect(() =>{
            getAllProducts(dispatch);
        },[]);

        // function convertBufferToBase64(buffer) {
        //   const binary = Array.from(new Uint8Array(buffer));
        //   const base64 = btoa(binary.map(byte => String.fromCharCode(byte)).join(''));
        //   return base64;
        // }
        return (
<>
<form onSubmit={(e) => {
  e.preventDefault();
  handleSearch(e.target.category.value);
}} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
  <input type="radio" id="category1" name="category" value="" style={{ marginRight: "5px" }}/>
  <label htmlFor="category1" style={{ marginRight: "10px" }}>ALL</label>
  <input type="radio" id="category2" name="category" value="PG" style={{ marginRight: "5px" }}/>
  <label htmlFor="category2" style={{ marginRight: "10px" }}>PG</label>
  <input type="radio" id="category3" name="category" value="MG" style={{ marginRight: "5px" }}/>
  <label htmlFor="category3" style={{ marginRight: "10px" }}>MG</label>  
  <input type="radio" id="category4" name="category" value="HG" style={{ marginRight: "5px" }}/>
  <label htmlFor="category4" style={{ marginRight: "10px" }}>HG</label>
  <input type="submit" value="Apply" style={{ marginLeft: "10px", padding: "5px 10px", background: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}/>
</form>


            <Container>
              {productData?.map((item) => {
                const base64String = convertBufferToBase64(item.img.data?.data);

                return(
                
                    <ContainerForEachItems key={item._id}>
                    <Circle />
                    <Image       src={`data:image/png;base64,${base64String}`} />
                    
                    <Info>                     
                      <Icon onClick={() => handleAddProduct(item._id)}>
                       <AiOutlineShoppingCart/>
                      </Icon>
                        <Link to={`/product/${item._id}`}>
                            <Icon >
                           <AiOutlineSearch/>
                            </Icon>
                        </Link>
                    </Info>
                  </ContainerForEachItems>
              )})}
            </Container>
            <ToastContainer/>
            <div>
    </div>
</>

          );
    }

    



export default Item;