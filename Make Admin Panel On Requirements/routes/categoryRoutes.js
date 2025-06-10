const express = require("express");

const route = express.Router();

const upload = require("../middleware/categoryMulter");

const { addCategoryPage, categoryInsert, viewCategoryPage, editCategoryPage, deleteCategory } = require("../controllers/categoryCTR");

// Add Category Page
route.get('/addCategoryPage', addCategoryPage);
route.post('/categoryInsert', upload.single('category_image'), categoryInsert)

// View Category Page
route.get('/viewCategory', viewCategoryPage);


// Edit Category
route.get('/editCategoryPage/:id', editCategoryPage);

// Delete Category
route.get('/deleteCategory/:id', deleteCategory);

module.exports = route;