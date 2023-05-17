import { getCart, clearCart, rmItemCart } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Cart = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const cartData = useSelector((state) => state.cart.carts?.allCarts);
  const productData = useSelector((state) => state.product.products?.allProducts);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    if (user?.accessToken) getCart(user?.others._id, user?.accessToken, dispatch);
  }, []);

  // HANDLE CLEAR CART
  function handleClearCart() {
    if (user?.accessToken) {
      clearCart(user.accessToken, user.others._id, dispatch, navigate);
    }
  }

  // HANDLE REMOVE EACH ITEM FROM CART
  function handleRemove(id) {
    const newItem = {
      id: id,
    };
    if (user?.accessToken) {
      rmItemCart(user.accessToken, user.others._id, newItem, dispatch);
    }
  }

  function handleQuantityChange(id, newQuantity) {
    // Update the quantity of the product in the cart
    // You can implement this functionality using the appropriate API request or Redux action

    // Example code:
    // const updatedItem = {
    //   id: id,
    //   quantity: newQuantity,
    // };
    // if (user?.accessToken) {
    //   updateCartItemQuantity(user.accessToken, user.others._id, updatedItem, dispatch);
    // }
  }

  function handleCheckout() {
    // Construct the checkout URL with user ID and cart items
    const checkoutUrl = `/checkout/?userId=${user?.others._id}&items=${JSON.stringify(cartData?.items)}`;

    // Navigate to the checkout form
    navigate(checkoutUrl);
  }

  return (
    <main className="container mx-auto p-10">
      {error ? <label>{error}</label> : null}
      <div className="flex flex-col space-y-4">
        {cartData?.items.map((item) => {
          return (
            <div key={item._id} className="border border-gray-300 rounded p-4 flex items-center">
              {/* <img src={item.productId.image} alt={item.productId.name} className="w-20 h-20 rounded mr-4" /> */}
              <div>
                <h1 className="text-xl font-bold">{item.productId.name}</h1>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                {/* <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 text-gray-500 rounded-md"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-200 text-gray-500 rounded-md"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div> */}
                <p className="text-gray-500">Price: {item.productId.price}</p>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove Item
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => handleClearCart()}
          >
            Clear Cart
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
