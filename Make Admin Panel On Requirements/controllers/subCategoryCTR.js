const subCategoryDetails = require('../models/subCategoryModel');
const categoryDetails = require('../models/categoryModel');
const adminDetails = require('../models/categoryModel');
const fs = require('fs');
const path = require('path');

const addSubCategory = async (req, res) => {
    const categories = await categoryDetails.find();
    res.render('subCategory/addSubCategoryPage', {
        success: req.flash("success"),
        error: req.flash("error"), 
        categories
    });
}


module.exports = {
    addSubCategory,
};