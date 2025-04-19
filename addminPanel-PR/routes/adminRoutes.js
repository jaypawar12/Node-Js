const express = require('express');

const route = express.Router();

console.log("Start Routing...");

const {loginPage, signUpPage, dashboard} = require('../controllers/adminPanelCTR');

route.get('/', loginPage);
route.get('/loginPage', signUpPage);
route.get('/dashboard', dashboard);

module.exports = route;