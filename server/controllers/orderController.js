const Order = require('../models/Order');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userId, cartId, deliveryInformation } = req.body;

      const newOrder = new Order({
        userId,
        cartId,
        deliveryInformation
      });

      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getOrder: async (req, res) => {
    try {
      const orderId = req.params.orderId;

      const order = await Order.findById(orderId);

      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: 'Order not found' });
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
