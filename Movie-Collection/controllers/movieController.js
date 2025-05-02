const movies = require('../models/movieSchema');
const fs = require('fs');
const path = require('path');

const homePage = async (req, res) => {
    try {
        const records = await movies.find();

        res.render('home', { record: records });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.send('Server Error');
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

// Movie Show :-
const movieShow = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await movies.findById(movieId);

        if (!movie) {
            return res.send("Movie not found");
        }
        res.render('movieDetails', { movie });
    } catch (error) {
        console.error("Error in movieShow:", error);
        res.send("Server error");
    }
};

// Delete Data :-

const delMovie = async (req, res) => {
    const id = req.query.id;

    try {
        const result = await movies.findByIdAndDelete(id);

        if (result) {
            // Delete the image if it exists
            const imagePath = path.join(__dirname, '..', result.movieImage); // adjust path if needed
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('Image deleted successfully');
            } else {
                console.log('Image file not found');
            }

            console.log("Movie deleted successfully");
        } else {
            console.log("Movie not found");
        }

        res.redirect('/');
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.send('Server Error');
    }
};

// Update Movie

const updateMovie = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const record = await movies.findById(id);
    res.render('upmovie', { record });

}

// Edit Movie :-

const editMovie = async (req, res) => {
    const id = req.params.id;

    try {
        const movie = await movies.findById(id);

        if (!movie) {
            return res.send('Movie not found');
        }

        // If a new image is uploaded
        if (req.file) {
            // Delete old image
            if (movie.movieImage) {
                const oldImagePath = path.join(__dirname, '..', movie.movieImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log('Old image deleted');
                }
            }

            // Update with new image path
            req.body.movieImage = req.file.path;
        } else {
            // If no new image, keep the old one
            req.body.movieImage = movie.movieImage;
        }

        // Update movie
        const upData = await movies.findByIdAndUpdate(id, req.body);

        if (upData) {
            console.log('Movie updated:', upData);
        }

        console.log('Form Data:', req.body);
        console.log('File:', req.file);
        res.redirect('/');
    } catch (error) {
        console.error('Error updating movie:', error);
        res.send('Server Error');
    }
};



module.exports = {
    homePage,
    formPage,
    movieAdd,
    delMovie,
    updateMovie,
    editMovie,
    movieShow,
}