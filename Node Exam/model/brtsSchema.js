const mongoose = require('mongoose');

const brtsRoutes = mongoose.Schema({
    busName: {
        type: String,
        require: true,
    },
    driverName: {
        type: String,
        require: true,
    },
    busRoute: {
        type: String,
        require: true,
    },
    busLength: {
        type: String,
        require: true,
    },
    busImage: {
        type: String,
        require: true,
    }
});

module.exports = brtsRoutes;

