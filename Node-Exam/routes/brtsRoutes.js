const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');

console.log("BRTS Routing initialized...");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

const {
    homePage,
    addBrts,
    brtsInsert,
    deleteBrts,
    updateBrts,
} = require('../controllers/brtsController');

// Routes
route.get('/', homePage);                    
route.get('/addBrts', addBrts);       
route.post('/brtsInsert', upload.single('busImage'), brtsInsert);    
route.get('/deleteBrts', deleteBrts);    
route.get('/updateBrts/:id', updateBrts);    

module.exports = route;
