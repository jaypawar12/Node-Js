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

const upload = multer({ storage: storage });

const route = express.Router();

console.log("Start Routing...");

const { signUpPage, signUp, signInPage, adminChecked, dashboard, addAdminPage, adminTable, viewProfile, adminInsert, editAdminPage, updateAdmin, deleteAdmin } = require('../controllers/adminPanelCTR');

route.get('/', signUpPage);
route.post('/signUp', signUp);
route.get('/signInPage', signInPage);
route.post('/signIn', adminChecked)
route.get('/dashboard', dashboard);
route.get('/addAdminPage', addAdminPage);
route.get('/adminTable', adminTable);
route.get('/viewProfile', viewProfile)

// Admin CURD :- 

// Insert...
route.post('/adminInset', upload.single('adminImage'), adminInsert);

// Delete...
route.get('/deleteAdmin/:deleteId', deleteAdmin);

// EditAdmin Page Render...
route.get('/editAdmin/:id', editAdminPage);

// Updating...
route.post('/updateAdmin/:id', upload.single('adminImage'), updateAdmin);
module.exports = route;