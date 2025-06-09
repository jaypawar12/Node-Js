const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
    },
    category_description: {
        type: String,
        required: true,
    },
    category_status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive'],
    },
    category_image: {
        type: String,
        required: true,
    }
});

const categoryDetails = mongoose.model('Category Details', categorySchema);

module.exports = categoryDetails;