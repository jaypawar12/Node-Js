const mongoose = require('mongoose');

const extraCategorySchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryDetails',     
        required: true,
    },
    subCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategoryDetails',   
        required: true,
    },
    extraCategory_name: {
        type: String,
        required: true,
    },
    extraCategory_description: {
        type: String,
        required: true,
    },
    extraCategory_status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive'],
    },
    extraCategory_image: {
        type: String,
        required: true,
    }
});

const extraCategoryDetails = mongoose.model('extraCategoryDetails', extraCategorySchema, "extraCategoryDetails");

module.exports = extraCategoryDetails;
