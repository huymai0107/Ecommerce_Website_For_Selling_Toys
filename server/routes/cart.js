// routes.js
const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// Cart routes
router.get('/:userId', cartController.getCart);
router.post('/:userId', cartController.addToCart);
router.delete('/:userId/:itemId', cartController.removeItem);
router.delete('/:userId', cartController.clearCart);

module.exports = router;
