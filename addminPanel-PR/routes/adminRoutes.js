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

const { signUpPage, signUp, signInPage, adminChecked, lossPasswordPage, lossPasswordForCheckEmail, otpVerifyPage, verifyOTP, newSetPasswordPage, checkNewPassword, dashboard, addAdminPage, adminTable, viewProfile, logOutAdmin, adminInsert, editAdminPage, updateAdmin, deleteAdmin } = require('../controllers/adminPanelCTR');

// For Sign Up
route.get('/', signUpPage);
route.post('/signUp',  upload.single('adminImage'), signUp);

// Loss Password 
route.get('/lossPasswordPage', lossPasswordPage);
route.post('/lossPasswordForCheckEmail', lossPasswordForCheckEmail);
route.get('/otpVerifyPage', otpVerifyPage);
route.post('/verifyOTP',verifyOTP);
route.get("/newSetPasswordPage", newSetPasswordPage);
route.post('/checkNewPassword', checkNewPassword)


// For Sign In
route.get('/signInPage', signInPage);
route.post('/signIn', adminChecked)

// Dashborad
route.get('/dashboard', dashboard);

// Adding Admin
route.get('/addAdminPage', addAdminPage);

// Show Admin Table
route.get('/adminTable', adminTable);

// View Admin Profile
route.get('/viewProfile', viewProfile);

// Logout Admin
route.get('/logOutAdmin', logOutAdmin);

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