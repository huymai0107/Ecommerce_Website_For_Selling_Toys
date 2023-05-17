import React, {useEffect}from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Notify } from '../../util/Notify';
import {
  getCart,
  addToCart,
  getAllProducts,
  getAllUsers,
} from "../../redux/apiRequest"; 
import { useDispatch,useSelector } from 'react-redux';
const Item = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.products?.allProducts);
  const user = useSelector((state) => state.auth.login?.currentUser);

  //HANDLE ADD PRODUCT TO CART
  function handleAddProduct(id) {
    const newItem = {
      productId: id,
    };
    if (!user) {
      navigate("/signin");
    } else {
      if (user?.accessToken) {
        addToCart(user.accessToken, user.others._id, newItem, dispatch, navigate);
        Notify("success")
      } else {
        Notify("Failed")
      }
    }
  }

   //GET ALL PRODUCTS
   useEffect(() => {
    getAllProducts(dispatch);
  }, []);
  

  return (
    <>
      <div className="p-20 flex flex-wrap justify-between">
        {productData?.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center justify-center m-5 w-72 h-80 bg-gray-100 relative"
          >
            <div className="w-52 h-52 rounded-full bg-white absolute"></div>
            {/* <img className="h-3/4 z-2" src={item.photo} alt={item.name} /> */}
            <div className=" w-full h-full absolute top-0 left-0 bg-white bg-opacity-20 flex items-center justify-center transition-all duration-500 cursor-pointer">
              <div className="flex justify-center space-x-4">
                <div
                  onClick={() => handleAddProduct(item._id)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-500 hover:bg-blue-100"
                >
                  <AiOutlineShoppingCart className='w-10 h-8'/>
                </div>
                <Link to={`/product/${item._id}`}>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-500 hover:bg-blue-100">
                    <AiOutlineSearch  className='w-10 h-8'/> 
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  )
}

export default Item