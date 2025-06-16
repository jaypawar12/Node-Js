const express = require("express");

const route = express.Router();

const upload = require("../middleware/extraCategoryMulter");

const {addExtraCategoryPage, extraCategoryInsert, viewExtraCategoryPage, editExtraCategoryPage} = require('../controllers/extraCategoryCTR')

// Add Category Page
route.get('/addExtraCategoryPage', addExtraCategoryPage);
route.post('/extraCategoryInsert', upload.single('extraCategory_image'), extraCategoryInsert)

// // View Category Page
route.get('/viewExtraCategoryPage', viewExtraCategoryPage);


// // Edit Category
route.get('/editExtraCategoryPage/:id', editExtraCategoryPage);
// route.post('/updateSubCategory/:id', upload.single('subCategory_image'), updateSubCategory);


// // Delete Category
// route.get('/deleteSubCategory/:id', deleteSubCategory);

module.exports = route;