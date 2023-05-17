const Order = require('../models/Order');

const orderController = {
  createOrder: async (req, res) => {
    // try {
      const { userId, items, deliveryInformation } = req.body;

      const newOrder = new Order({
        userId,
        items,
        deliveryInformation
      });

      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder);
    // } catch (error) {
    //   res.status(500).json({ error: 'Internal server error' });
    // }
  },

  getOrders: async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ userId: userId });
  
      if (orders) {
        res.json(orders);
      } else {
        res.status(404).json({ error: 'No orders found for this user' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  

  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const { deliveryInformation, condition } = req.body;

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { deliveryInformation, condition },
        { new: true }
      );

      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = orderController;
