const express = require('express');

const upload = require('../config/upload');

const route = express.Router();

console.log("Routing...!");

const movieCTR = require("../controllers/movieController.js");


route.get('/', movieCTR.homePage);
route.get('/form', movieCTR.formPage); 
route.post('/movie-submit', upload.single('movieImage'),movieCTR.movieAdd)

module.exports = route;
