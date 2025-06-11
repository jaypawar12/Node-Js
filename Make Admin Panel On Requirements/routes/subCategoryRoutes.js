const express = require("express");

const route = express.Router();

const upload = require("../middleware/subCategoryMulter");

const { addSubCategory } = require("../controllers/subCategoryCTR");

// Add Category Page
route.get('/addSubCategoryPage', addSubCategory);
// route.post('/categoryInsert', upload.single('category_image'), categoryInsert)

// // View Category Page
// route.get('/viewCategory', viewCategoryPage);


// // Edit Category
// route.get('/editCategoryPage/:id', editCategoryPage);

// route.post('/updateCategory/:id', upload.single('category_image'), updateCategory);

// // Delete Category
// route.get('/deleteCategory/:id', deleteCategory);

module.exports = route;