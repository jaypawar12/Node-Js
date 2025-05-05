const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
});

const upload = multer({storage : storage});

const route = express.Router();

console.log("Start Routing...");

const {signInPage, signUpPage, dashboard, adminInsert, addAdminPage,adminTable, editAdminPage, deleteAdmin} = require('../controllers/adminPanelCTR');

route.get('/', signUpPage);
route.get('/signInPage', signInPage);
route.get('/dashboard', dashboard);
route.get('/addAdminPage', addAdminPage);
route.get('/adminTable', adminTable);

// Admin CURD :- 

// Insert...
route.post('/adminInset', upload.single('adminImage'), adminInsert);

// Delete...
route.get('/deleteAdmin/:deleteId', deleteAdmin);

// EditAdmin Page Render...
route.get('/editAdmin/:id', editAdminPage);
module.exports = route;