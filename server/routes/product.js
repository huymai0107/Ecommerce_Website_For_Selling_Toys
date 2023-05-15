// routes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Product routes
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
