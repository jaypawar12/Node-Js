const mongoose = require('mongoose');

// MongoDB Schema For Movie

const movieSchema = mongoose.Schema({
    movieName: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    ticketPrice: {
        type: String,
        require: true,
    },
    rating: {
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    movieImage:{
        type: String,
        require: true,
    },
});

const movie = mongoose.model('movieShow', movieSchema);

module.exports = movie;