const Product = require("../models/Product");
var fs = require('fs');

// Controller methods
const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  searchProduct: async (req, res) => {
    try {
      const Searchterm = req.params.searchterm;
      const product = await Product.find({$or: [{name: Searchterm},{category: Searchterm}]})
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createProduct: async (req, res) => {
    // try {
      const { name, price, description, category } = req.body;
      console.log(req.file)
      // const product = await Product.create({ name, price, description,})


        const product = new Product({
          name,
          price,
          description,
          category,
          img:{
            data: fs.readFileSync("uploads/"+ req.file.filename),
            contentType:"image/png"
          }
        });
        const saveproduct = await product.save();


      res.status(201).json(product);
    // } catch (error) {
    //   res.status(500).json({ error: 'Internal server error' });
    // }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const { name, price, description } = req.body;
      const product = await Product.findByIdAndUpdate(productId, { name, price, description }, { new: true });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findByIdAndDelete(productId);
      if (product) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = productController;
