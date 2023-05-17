import React, { useEffect } from 'react';
import { getOrder } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const orderData = useSelector((state) => state.order.orders.allOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    getOrder(user?.accessToken, user?.others._id, dispatch);
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Order Information</h1>
      {Array.isArray(orderData) && orderData.length > 0 ? (
        orderData.map((order) => (
          <div key={order._id} className="border border-gray-300 rounded p-4 mb-8">
            <h2 className="text-xl font-bold">Order ID: {order._id}</h2>
            <h3>User ID: {order.userId}</h3>
            <div className="mt-4">
              <h3 className="font-bold">Delivery Information:</h3>
              <p className="mb-2">Name: {order.deliveryInformation.name}</p>
              <p className="mb-2">Address: {order.deliveryInformation.address}</p>
              <p className="mb-2">Phone Number: {order.deliveryInformation.phoneNumber}</p>
              <p className="mb-2">Condition: {order.condition}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.productId}>
                    Product ID: {item.productId}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Order;
