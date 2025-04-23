const mongoose = require('mongoose');

const brtsRoutes = new mongoose.Schema({
    busName: {
        type: String,
        required: true,
    },
    driverName: {
        type: String,
        required: true,
    },
    busRoute: {
        type: String,
        required: true,
    },
    busLength: {
        type: String,
        required: true,
    },
    busImage: {
        type: String,
        required: true,
    }
});

const Brts = mongoose.model('Brts', brtsRoutes);
module.exports = Brts;
