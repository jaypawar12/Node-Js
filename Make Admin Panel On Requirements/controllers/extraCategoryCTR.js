const extraCategoryDetails = require('../models/extraCaetgoryModel');
const subCategoryDetails = require('../models/subCategoryModel');
const categoryDetails = require('../models/categoryModel');
const fs = require('fs');
const path = require('path');

const addExtraCategoryPage = async (req, res) => {
    const categoryData = await categoryDetails.find();
    const subCategoryData = await subCategoryDetails.find();
    res.render('extraCategory/addExtraCategoryPage', {
        success: req.flash("success"),
        error: req.flash("error"),
        categoryData,
        subCategoryData,
    });
};

const extraCategoryInsert = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        req.body.extraCategory_image = req.file.path;
        const newExtraCategory = extraCategoryDetails.create(req.body);

        if (newExtraCategory) {
            req.flash("success", "Extra Category added successfully.");
        } else {
            req.flash("error", "Failed to add Extra Category!");
        }
        res.redirect('/extraCategory/addExtraCategoryPage');
    } catch (e) {
        req.flash("error", `Exception: ${e}`);
        res.redirect('/extraCategory/addExtraCategoryPage');
    }

};

const viewExtraCategoryPage = async (req, res) => {
    try {
        const extraCategory = await extraCategoryDetails.find().populate("category_id").populate("subCategory_id").exec();
        console.log(extraCategory);
        const categories = await categoryDetails.find();
        const subcategories = await subCategoryDetails.find();


        if (extraCategory) {
            res.render("extraCategory/viewExtraCategoryPage", {
                extraCategory,
                categories,
                subcategories,
                success: req.flash("success"),
                error: req.flash("error"),
            });
        } else {
            req.flash("error", "SubCategory not found.");
            res.redirect("/extraCategory/viewExtraCategoryPage");
        }

    } catch (error) {
        console.error("Error fetching Extra Category:", error);
        req.flash("error", "Failed to load Extra Category. Please try again later.");
        res.redirect('/extraCategory/viewExtraCategoryPage');
    }
};

const editExtraCategoryPage = async (req, res) => {
    try {
        const categoryData = await categoryDetails.find({});
        const subCategoryData = await subCategoryDetails.find({});
        const extraCategoryData = await extraCategoryDetails.findById(req.params.id);

        if (categoryData && subCategoryData && extraCategoryData) {
            res.render('extraCategory/editExtraCategoryPage', {
                categoryData,
                subCategoryData,
                extraCategoryData,
                success: req.flash('success'),
                error: req.flash('error')
            });
        } else {
            req.flash('error', 'Extracategory not found.');
            res.redirect('/dashboard');
        }
    } catch (e) {
        console.error("Edit Page Error:", err);
        req.flash('error', 'Something went wrong.');
        res.redirect('/extraCategory/viewExtraCategoryPage');
    }
};

const updateExtraCategory = async (req, res) => {
    // console.log("Update Body:", req.body);
    // console.log("Extra Category ID:", req.params.id);
    // console.log("Extra Category Image:", req.file);

    try {
        const updateExtraCategoryData = await extraCategoryDetails.findById(req.params.id);

        if (req.file) {
            fs.unlinkSync(updateExtraCategoryData.extraCategory_image);

            req.body.extraCategory_image = req.file.path;
        }

        const updated = await extraCategoryDetails.findByIdAndUpdate(req.params.id, req.body);

        if (updated) {
            req.flash('success', 'Extra Category updated successfully.');
        } else {
            req.flash('error', 'Extra Category not found or not updated.');
        }

        res.redirect('/extraCategory/viewExtraCategoryPage');
    } catch (err) {
        console.error("Update Error:", err);
        req.flash('error', 'Error updating Extra Category.');
        res.redirect('/extraCategory/viewExtraCategoryPage');
    }
};

const deleteExtraCategory = async (req, res) => {
    const deleteId = req.params.id;

    console.log("Delete ExtraCategory Id", deleteId);

    try {
        const deletExtraCategory = await extraCategoryDetails.deleteMany({
            extraCategory_id: deleteId,
        });

        const deleteProduct = await productDetails.deleteMany({
            extraCategory_id: req.params.id,
        });

        if (deletExtraCategory && deleteProduct) {
            const deleteExtraCategory = await extraCategoryDetails.findByIdAndDelete(deleteId);
            console.log(deleteExtraCategory);

            if (deleteExtraCategory) {
                req.flash(
                    "success",
                    `<i class="fas fa-check-circle me-2"></i>${deleteExtraCategory.extraCategory_name} deleted successfully...`
                );
            } else {
                req.flash("error", "ExtraCategory Not Found or Already Deleted.");
            }
        } else {
            req.flash("error", "ExtraCategory Not Found or Already Deleted..");
        }

        res.redirect("/extraCategory/viewExtraCategoryPage");
    } catch (e) {
        console.log(e);
        req.flash(
            "error",
            "Something went wrong while trying to delete the sub‑category."
        );
        res.redirect("/extraCategory/viewExtraCategoryPage");
    }
}

module.exports = {
    addExtraCategoryPage,
    extraCategoryInsert,
    viewExtraCategoryPage,
    editExtraCategoryPage,
    updateExtraCategory,
    deleteExtraCategory,
};  