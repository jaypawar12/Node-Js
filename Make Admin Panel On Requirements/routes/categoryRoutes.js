const express = require("express");

const route = express.Router();

const upload = require("../middleware/categoryMulter");

const {addCategoryPage, categoryInsert, viewCategoryPage} = require("../controllers/categoryCTR");

// Add Category Page
route.get('/addCategoryPage', addCategoryPage);
route.post('/categoryInsert', categoryInsert)

// View Category Page
route.get('/viewCategory', viewCategoryPage);

module.exports = route;