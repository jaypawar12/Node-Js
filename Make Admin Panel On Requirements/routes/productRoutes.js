const express = require("express");

const route = express.Router();

const upload = require("../middleware/productMulter");

const { addProductPage, insertProduct, viewProductPage } = require('../controllers/productCTR');

// // Add Category Page
route.get('/addProductPage', addProductPage);
route.post('/insertProduct', upload.single('product_image'), insertProduct);

// // // View Category Page
route.get('/viewProductPage', viewProductPage);

// // // Edit Category
// route.get('/editExtraCategoryPage/:id', editExtraCategoryPage);
// route.post('/updateExtraCategory/:id', upload.single('extraCategory_image'), updateExtraCategory);


// // // Delete Category
// route.get('/deleteExtraCategory/:id', deleteExtraCategory);

module.exports = route;