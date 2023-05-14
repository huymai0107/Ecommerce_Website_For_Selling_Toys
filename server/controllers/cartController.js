const Cart = require('../models/Cart');

const cartController = {
  getCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  addToCart: async (req, res) => {
    // try {
      const userId = req.params.userId;
      const { productId, quantity } = req.body;
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $addToSet: { items: { productId, quantity } } },
        { new: true, upsert: true }
      ).populate('items.productId');
      res.json(cart);
    // } catch (error) {
    //   res.status(500).json({ error: 'Internal server error' });
    // }
  },

  removeItem: async (req, res) => {
    try {
      const userId = req.params.userId;
      const itemId = req.params.itemId;
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { _id: itemId } } },
        { new: true }
      ).populate('items.productId');
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  clearCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      await Cart.findOneAndRemove({ userId });
      res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = cartController;
