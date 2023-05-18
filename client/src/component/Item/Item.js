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
        const productData = useSelector((state) => state.product.products?.allProducts);
        const user = useSelector((state) => state.auth.login?.currentUser);
        
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