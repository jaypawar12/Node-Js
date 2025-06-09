const adminDetails = require('../models/categoryModel');

const addCategoryPage = (req, res) => {
    res.render('category/addCategoryPage', {
        success: req.flash("success"),
        error: req.flash("error")
    });
}

const categoryInsert = (req, res) => {
    
}

const viewCategoryPage = async (req, res) => {
    res.render("category/viewCategoryPage", {
        success: req.flash("success"),
        error: req.flash("error"),
    });
}

module.exports = { addCategoryPage, categoryInsert, viewCategoryPage };