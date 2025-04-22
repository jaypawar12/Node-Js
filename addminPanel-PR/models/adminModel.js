const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminFame: {
        type: String,
        require: true,
    },
    adminLame: {
        type: String,
        require: true,
    },
    adminEmail: {
        type: String,
        require: true,
    },
    adminFunction: {
        type: String,
        require: true,
    },
    joinDate: {
        type: String,
        require:  true,
    },
});

const adminDetails = mongoose.model('Admin Details',adminSchema);

module.exports = adminDetails;

