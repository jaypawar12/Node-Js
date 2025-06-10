const categoryDetails = require('../models/categoryModel');
const adminDetails = require('../models/categoryModel');
const path = require('path'); 
const fs = require('fs');

const addCategoryPage = (req, res) => {
    res.render('category/addCategoryPage', {
        success: req.flash("success"),
        error: req.flash("error")
    });
}

const categoryInsert = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        req.body.category_image = req.file.path;
        const newCategory = categoryDetails.create(req.body);
        if (newCategory) {
            req.flash("success", "Category added successfully!");
        } else {
            req.flash("error", "Failed to add category.");
        }
        res.redirect('/category/addCategoryPage');
    } catch (e) {
        req.flash("error", `Exception: ${e}`);
        res.redirect("/category/addCategoryPage");
    }
}

const viewCategoryPage = async (req, res) => {
    try {
        const categories = await categoryDetails.find({});

        res.render("category/viewCategoryPage", {
            categories: categories,
            error: req.flash('error'),
            success: req.flash('success')
        });

    } catch (error) {
        console.error("Error fetching categories:", error);
        req.flash("error", "Failed to load categories. Please try again later.");
        res.redirect('/category/addCategoryPage');
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;

        const categoryToDelete = await categoryDetails.findById(id);
        if (!categoryToDelete) {
            return res.status(404).send('Category not found for deletion.');
        }

        if (categoryToDelete.category_image) {
            const imagePath = path.join(__dirname, '..', categoryToDelete.category_image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image file:', err);
            });
        }

        await categoryDetails.findByIdAndDelete(id);

        res.redirect('/category/viewCategory');
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send('Server Error: Could not delete category.');
    }
}

const editCategoryPage = async (req, res) => {
    
}

module.exports = { addCategoryPage, categoryInsert, viewCategoryPage, editCategoryPage, deleteCategory };