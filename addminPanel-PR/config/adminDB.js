const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/admin-CURD";

mongoose.connect(URI);

const db = mongoose.connection;

db.on('connected', () => {
    console.log("DB Connected...."); 
});
db.on('diconnected', () => {
    console.log("DB Disconnected...."); 
});
db.on('error', (err) => {
    console.log("DB Not Connected....",err); 
});

module.exports = db;