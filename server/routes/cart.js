// routes.js
const express = require('express');
const cartController = require('../controllers/cartController');
const { verifyTokenAndAuthAdmin, verifyToken } = require('../middlewares/verifytoken');

const router = express.Router();

// Cart routes
router.get('/:userId',verifyToken, cartController.getCart);
router.post('/:userId',verifyToken, cartController.addToCart);
router.delete('/:userId/:itemId',verifyToken, cartController.removeItem);
router.delete('/:userId',verifyToken,cartController.clearCart);

module.exports = router;
