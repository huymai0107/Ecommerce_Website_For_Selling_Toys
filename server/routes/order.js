// routes.js
const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Order routes
router.post('/', orderController.createOrder);
router.get('/:orderId', orderController.getOrder);
router.put('/:orderId', orderController.updateOrder);

module.exports = router;
