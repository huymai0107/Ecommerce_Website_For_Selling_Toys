// routes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "uploads")
  },
  filename:(req, file, cb) =>{
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

// Product routes
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.get('/search/:searchterm', productController.searchProduct);
router.post('/',upload.single("testImage"),productController.createProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
