const express = require('express');
const route = express.Router();

console.log("Routing...");

const {homePage,addBrts,brtsInsert} = require('../controllers/brtsController');

route.get('/',homePage);
route.get('/addBrts', addBrts);
route.post('/brtsInsert',brtsInsert);

module.exports = route;