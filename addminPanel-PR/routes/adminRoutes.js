const express = require('express');

const route = express.Router();

console.log("Start Routing...");

const {loginPage, signUpPage} = require('../controllers/adminPanelCTR');

route.get('/', loginPage);
route.get('/loginPage', signUpPage);

module.exports = route;