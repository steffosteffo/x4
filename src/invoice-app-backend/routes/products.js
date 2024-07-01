// routes/products.js
const express = require('express');
const router = express.Router();
const  Product = require('../models/Product');

router.post('/', async (req, res) => { // Use async to allow await
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save(); // Wait for the save operation to complete
    console.log('Product saved:', savedProduct);

    // Send back the saved product with its _id
    res.json({ _id: savedProduct._id, ...savedProduct._doc }); // Include _id in the response
    console.log('----------savedProduct._id= ' + savedProduct._id)
    console.log('----------savedProduct= ' + savedProduct)
    // console.log('----------savedProduct._id=  ' + savedProduct._id)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle Fetch (hämta) all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle updating an existing product
router.put('/:id', async (req, res) => {
  const productsId = req.params.id;
  const {productname, pris} = req.body;
  //const { productname, antal, pris, summa, moms, tot } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productsId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Update Product properties
    product.productname = productname;
    product.pris = pris;

    //product.antal = antal;
    //product.summa = summa;
    //product.moms = moms;
    //product.tot = tot;

    // Save the updated product
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



////
// DESSA  NEDAN ANVÄNDS INTE I GUI -endast imp. här för att kunna användas senare :-) 
///

// Route to handle deleting a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
