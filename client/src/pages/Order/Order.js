import React, { useEffect } from 'react';
import { getOrder } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import './Order.css';

const Order = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const orderData = useSelector((state) => state.order.orders.allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrder(user?.accessToken, user?.others._id, dispatch);
  }, []);

  return (
    <div className="order-container">
      <h1 className="order-heading">Order Information</h1>
      {orderData && orderData.map((order) => (
        <div key={order._id} className="order-item">
          <h2>Order ID: {order._id}</h2>
          <h3>User ID: {order.userId}</h3>
          <h3>Delivery Information:</h3>
          <p>Name: {order.deliveryInformation.name}</p>
          <p>Address: {order.deliveryInformation.address}</p>
          <p>Phone Number: {order.deliveryInformation.phoneNumber}</p>
          <h3>Items:</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.productId}>
                Product ID: {item.productId}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Order;
