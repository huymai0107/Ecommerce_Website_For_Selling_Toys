import React from 'react'
import "./Product.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProductById } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/apiRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import './productPage.css'; // Import the CSS file


const Product = () => {
    const [selectedNumber, setSelectedNumber] = useState('');
    const handleNumberChange = (event) => {
        setSelectedNumber(event.target.value);
      };

      const numberOptions = [];
      for (let i = 1; i <= 99; i++) {
        numberOptions.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    const Loginnotify = () => {
        toast.warn('Sign-In first please!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: 1
            });
    };
    const SuccessNotify = () => {
        toast.success('Added to Cart', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: 1
            });
    };
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    async function handleAddProduct(id) {
        const newItem ={
            productId: id,
          }
        if(!user)
            {
                Loginnotify();
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 1 second
                navigate("/signin")
            }
        else {
            {
                addToCart(user?.others._id,newItem,dispatch, navigate,)
                SuccessNotify();
            }
                
        }
      }
    const theproductData = useSelector((state) => state.theproduct.theproduct?.theproduct);
    const  id  = useParams()
    const dispatch = useDispatch();
        //GET ALL PRODUCTS
        useEffect(() =>{
            getProductById(id,dispatch);
            
        },[]);
    return (
<>
<div className="product-page">
      <h1 className="product-name">{theproductData?.name}</h1>
      <p className="product-price">Price: ${theproductData?.price}</p>
      <p className="product-description">{theproductData?.description}</p>
        <select value={selectedNumber} onChange={handleNumberChange}>
            <option value="1" name="test">Select a number</option>
            {numberOptions}
        </select>
      <button onClick={() => handleAddProduct(theproductData._id,test)}> add </button>

      <ToastContainer/>
    </div>
</>


    );
  };
  export default Product;
