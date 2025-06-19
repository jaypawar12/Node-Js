const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true,
    },
    product_description: {
        type: String,
        required: true,
        trim: true,
    },
    product_price: {
        type: Number,
        required: true,
        min: 0
    },
    product_discount: {
        type: Number,
        default: 0
    },
    product_final_price: {
        type: Number,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryDetails',
        required: true
    },
    subCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategoryDetails',
        required: true
    },
    extraCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extraCategoryDetails',
        required: true
    },
    product_status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
});

const productDetails = mongoose.model('productDetails', productSchema, "productDetails");

module.exports = productDetails;
