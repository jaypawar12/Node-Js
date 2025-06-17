const express = require("express");

const route = express.Router();

const upload = require("../middleware/extraCategoryMulter");

const { addExtraCategoryPage, extraCategoryInsert, viewExtraCategoryPage, editExtraCategoryPage, updateExtraCategory, deleteExtraCategory } = require('../controllers/extraCategoryCTR')

// Add Category Page
route.get('/addExtraCategoryPage', addExtraCategoryPage);
route.post('/extraCategoryInsert', upload.single('extraCategory_image'), extraCategoryInsert)

// // View Category Page
route.get('/viewExtraCategoryPage', viewExtraCategoryPage);

// // Edit Category
route.get('/editExtraCategoryPage/:id', editExtraCategoryPage);
route.post('/updateExtraCategory/:id', upload.single('extraCategory_image'), updateExtraCategory);


// // Delete Category
route.get('/deleteExtraCategory/:id', deleteExtraCategory);

module.exports = route;