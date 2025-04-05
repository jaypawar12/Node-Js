const e = require('express');
const movies = require('../models/movieSchema');
const movie = require('../models/movieSchema');

const homePage = async(req, res) => {
    try {
        // Fetch the movie data from the database
        const records = await movie.find();  // Adjust this according to your database logic

        // Render the home page and pass the records to the view
        res.render('home', { record: records });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Server Error');
    }
}

const formPage = (req, res) => {
    res.render('form');
}

// Data Insert :-

const movieAdd = async (req, res) => {


    console.log(req.file);

    if (req.file) {
        req.body.movieImage = req.file.path;
    }

    console.log(req.body);

    const insert = await movies.create(req.body);

    if (insert) {
        console.log('Movie data inserted...', insert);
    } else {
        console.log('Movie data not insertion...', insert);
    }

    res.redirect('/');
}

module.exports = {
    homePage,
    formPage,
    movieAdd,
}