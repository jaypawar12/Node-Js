const mongoose = require('mongoose');

// MongoDB Schema
const carSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

// MongoDB Model
const cars = mongoose.model('car-showroom', carSchema);

module.exports = cars;