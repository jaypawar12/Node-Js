const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminFname: {
        type: String,
        require: true,
    },
    adminLname: {
        type: String,
        require: true,
    },
    adminEmail: {
        type: String,
        require: true,
    },
    adminPassword: {
        type: String,
        require: true,
    },
    adminFunction: {
        type: String,
        require: true,
    },
    adminStatus: {
        type: String,
        require: true,
    },
    joinDate: {
        type: String,
        require:  true,
    },
    adminImage: {
        type: String,
        require: true,
    }
});

const adminDetails = mongoose.model('Admin Details',adminSchema);

module.exports = adminDetails;

