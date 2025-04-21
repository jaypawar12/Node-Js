const express = require('express');

const route = express.Router();

console.log("Start Routing...");

const {signInPage, signUpPage, dashboard, addAdminPage,adminTable} = require('../controllers/adminPanelCTR');

route.get('/', signUpPage);
route.get('/signInPage', signInPage);
route.get('/dashboard', dashboard);
route.get('/addAdminPage', addAdminPage);
route.get('/adminTable', adminTable);

module.exports = route;