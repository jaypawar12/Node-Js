const express = require('express');

const route = express.Router();

console.log("Start Routing...");

const {signInPage, signUpPage, dashboard, adminInset, addAdminPage,adminTable} = require('../controllers/adminPanelCTR');

route.get('/', signUpPage);
route.get('/signInPage', signInPage);
route.get('/dashboard', dashboard);
route.post('/admin-inset', adminInset);
route.get('/addAdminPage', addAdminPage);
route.get('/adminTable', adminTable);

module.exports = route;