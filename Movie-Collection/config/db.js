const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/movie-colle";
mongoose.connect(URI);

const db = mongoose.connection;


db.on('connected', () => {
    console.log("DataBase is Connected...!");
});
db.on('error', (err) => {
    console.log("DataBase is Not Connected...!",err);
});
db.on('disconnected', () => {
    console.log("DataBase is Disconnected...!");
})
module.exports = db;