const productDetails = require('../models/productModel');
const extraCategoryDetails = require('../models/extraCaetgoryModel');
const subCategoryDetails = require('../models/subCategoryModel');
const categoryDetails = require('../models/categoryModel');
const fs = require('fs');
const path = require('path');

const addProductPage = async (req, res) => {
    const categories = await categoryDetails.find();
    const subCategories = await subCategoryDetails.find();
    const extraCategories = await extraCategoryDetails.find();
    res.render('product/addProductPage', {
        success: req.flash("success"),
        error: req.flash("error"),
        categories,
        subCategories,
        extraCategories,
    });
};

const insertProduct = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        req.body.product_image = req.file.path;
        const newProduct = productDetails.create(req.body);

        if (newProduct) {
            req.flash("success", "Product added successfully.");
        } else {
            req.flash("error", "Failed to add Product!");
        }
        res.redirect('/product/addProductPage');
    } catch (e) {
        req.flash("error", `Exception: ${e}`);
        res.redirect('/product/addProductPage');
    }

};

const viewProductPage = async (req, res) => {

    try {
        console.log("VIEW cONTROLLER CALL");
        const productData = await productDetails.find().populate("category_id").populate("subCategory_id").populate("extraCategory_id").exec();
        console.log(productData);
        const categories = await categoryDetails.find();
        const subcategories = await subCategoryDetails.find();
        const extraCategories = await extraCategoryDetails.find();


        if (productData) {
            res.render("product/viewProductPage", {
                productData,
                categories,
                subcategories,
                extraCategories,
                success: req.flash("success"),
                error: req.flash("error"),
            });
        } else {
            req.flash("error", "Product not found.");
            res.redirect("/product/viewProductPage");
        }

    } catch (error) {
        console.error("Error fetching Product:", error);
        req.flash("error", "Failed to load Product. Please try again later.");
        res.redirect("/product/viewProductPage");
    }
};

const editProductPage = async (req, res) => {
    try {
        const categoryData = await categoryDetails.find({});
        const subCategoryData = await subCategoryDetails.find({});
        const extraCategoryData = await extraCategoryDetails.find({});
        const productData = await productDetails.findById(req.params.id);

        if (categoryData && subCategoryData && extraCategoryData && productData) {
            res.render('product/editProductPage', {
                categoryData,
                subCategoryData,
                extraCategoryData,
                productData,
                success: req.flash('success'),
                error: req.flash('error')
            });
        } else {
            req.flash('error', 'Product not found.');
            res.redirect('/dashboard');
        }
    } catch (e) {
        console.error("Edit Page Error:", err);
        req.flash('error', 'Something went wrong.');
        res.redirect('/product/viewProductPage');
    }
};

const updateProduct = async (req, res) => {
    // console.log("Update Body:", req.body);
    // console.log("Extra Category ID:", req.params.id);
    // console.log("Extra Category Image:", req.file);

    try {
        const updateProductData = await productDetails.findById(req.params.id);

        if (req.file) {
            fs.unlinkSync(updateProductData.product_image);

            req.body.product_image = req.file.path;
        }

        const updated = await productDetails.findByIdAndUpdate(req.params.id, req.body);

        if (updated) {
            req.flash('success', 'Product updated successfully.');
        } else {
            req.flash('error', 'Product not found or not updated.');
        }

        res.redirect('/product/viewProductPage');
    } catch (err) {
        console.error("Update Error:", err);
        req.flash('error', 'Error updating Product.');
        res.redirect('/product/viewProductPage');
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteProduct = await productDetails.findByIdAndDelete(id);

        fs.unlinkSync(deleteProduct.product_image);
        if (deleteProduct) {
            req.flash("success", `${deleteProduct.product_name} deleted successfully.`);
        } else {
            req.flash("error", "Product not found.");
        }
    } catch (error) {
        console.log(error);
        req.flash("error", "Something went wrong while deleting.");
    }
    res.redirect("/product/viewProductPage");
}

module.exports = {
    addProductPage,
    insertProduct,
    viewProductPage,
    editProductPage,
    updateProduct,
    deleteProduct,
};  