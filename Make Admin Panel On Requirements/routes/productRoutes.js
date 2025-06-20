const express = require("express");

const route = express.Router();

const upload = require("../middleware/productMulter");

const { addProductPage, insertProduct, viewProductPage, editProductPage, updateProduct, deleteProduct } = require('../controllers/productCTR');

// // Add Category Page
route.get('/addProductPage', addProductPage);
route.post('/insertProduct', upload.single('product_image'), insertProduct);

// // // View Category Page
route.get('/viewProductPage', viewProductPage);

// // // Edit Category
route.get('/editProductPage/:id', editProductPage);
route.post('/updateProduct/:id', upload.single('extraCategory_image'), updateProduct);


// // // Delete Category
route.post('/deleteProduct/:id', deleteProduct);

module.exports = route;