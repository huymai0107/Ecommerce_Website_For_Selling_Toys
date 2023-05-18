import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getProductById } from '../redux/apiRequest';
import { addToCart } from '../redux/apiRequest';
import { warn } from '../util/Warn';
import { success } from '../util/Success';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styled from "styled-components";
import { convertBufferToBase64 } from '../util/convertBufferToBase64';
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
function Product() {
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

  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();

  async function handleAddProduct(id) {
    const newItem = {
      productId: id,
      quantity: selectedNumber,
    };
    if (!user) {
      warn('Need to sign in');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
      navigate('/signin');
    } else {
      if (user?.accessToken) {
        addToCart(user.accessToken, user.others._id, newItem, dispatch, navigate);
        success('Added');
      }
    }
  }
  const theproductData = useSelector((state) => state.theproduct.theproduct?.theproduct);
  const  id  = useParams();
  const dispatch = useDispatch();
  //GET ALL PRODUCTS
  useEffect(() => {
    getProductById(id, dispatch);
  }, []);

  
  const base64String = convertBufferToBase64(theproductData?.img.data.data);
  return (
    
    <div className="container mx-auto p-10">
      <div className="flex items-center">
        <div className="w-96 h-96 bg-gray-200 rounded-lg">
        <Image       src={`data:image/png;base64,${base64String}`} />
        </div>
        <div className="ml-8">
          <h2 className="text-3xl font-bold">{theproductData?.name}</h2>
          <p className="text-gray-500 mt-2">Price: {theproductData?.price}</p>
          <div className="flex items-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => handleAddProduct(theproductData?._id)}
            >
              Add to Cart
            </button>
            <div className="flex items-center space-x-2 ml-4">
              <button
                className="px-2 py-1 bg-gray-200 text-gray-500 rounded-md"
                onClick={() => setSelectedNumber(selectedNumber - 1)}
              >
                <AiOutlineMinus className="h-4 w-4" />
              </button>
              <span>{selectedNumber}</span>
              <button
                className="px-2 py-1 bg-gray-200 text-gray-500 rounded-md"
                onClick={() => setSelectedNumber(parseInt(selectedNumber+1))}
              >
                <AiOutlinePlus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-gray-500 mt-4">{theproductData?.description}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Product;
