const movies = require('../models/movieSchema');

const homePage = async (req, res) => {
    try {
        const records = await movies.find();

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

// Delete Data :-

const delMovie = async (req, res) => {
    const id = req.query.id;
    console.log("Delete Id: ", id);

    try {
        const result = await movies.findByIdAndDelete(id);
        if (result) {
            console.log("Movie deleted successfully");
        } else {
            console.log("Movie not found");
        }
        res.redirect('/');  // Redirect after deletion
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).send('Server Error');
    }
}

// Update Movie

const updateMovie = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const record = await movies.findById(id)
    res.render('upmovie', { record });

}

// Edit Movie :-

const editMovie = async (req, res) => {
    const id = req.params.id;

    if (req.file) {
        req.body.movieImage = req.file.path;
    }

    try {
        await movies.findByIdAndUpdate(id, req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).send('Server Error');
    }
};



module.exports = {
    homePage,
    formPage,
    movieAdd,
    delMovie,
    updateMovie,
    editMovie,
}