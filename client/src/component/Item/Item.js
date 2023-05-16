import { Component } from "react";
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from '@mui/icons-material';
import {getCart, addToCart, getAllProducts, getAllUsers } from '../../redux/apiRequest'
import {useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

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
        // console.log(user)

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
                addToCart(user.others._id,newItem,dispatch, navigate,)
            }

          }
        //GET ALL PRODUCTS
        useEffect(() =>{
            getAllProducts(dispatch);
        },[]);
        return (

            <Container>
              {productData?.map((item) => (
                
                    <ContainerForEachItems key={item._id}>
                    <Circle />
                    {/* <Image src={item.photo} /> */}
                    <Info>                     
                      <Icon onClick={() => handleAddProduct(item._id)}>
                        <ShoppingCartOutlined />
                      </Icon>
                        <Link to={`/product/${item._id}`}>
                            <Icon >
                            <SearchOutlined />
                            </Icon>
                        </Link>
                    </Info>
                  </ContainerForEachItems>
              ))}
            </Container>

          );
    }

    



export default Item;