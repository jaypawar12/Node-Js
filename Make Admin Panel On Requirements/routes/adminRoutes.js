const express = require('express');
const multer = require('multer');
const passport = require("passport");

const upload = require("../middleware/adminMulter");

const route = express.Router();

console.log("Start Routing...");

const { signUpPage, signUp, signInPage, adminChecked, lossPasswordPage, lossPasswordForCheckEmail, otpVerifyPage, verifyOTP, newSetPasswordPage, checkNewPassword, dashboard, addAdminPage, adminTable, viewProfile, editCurrentAdmin, updateCurrentAdmin, logOutAdmin, changePasswordPage, updatePassword, adminInsert, editAdminPage, updateAdmin, deleteAdmin } = require('../controllers/adminPanelCTR');

// Loss Password 
route.get('/lossPasswordPage', passport.checkForgetPasswordAuthentication, lossPasswordPage);
route.post('/lossPasswordForCheckEmail', lossPasswordForCheckEmail);
route.get('/otpVerifyPage', passport.checkForgetPasswordAuthentication, otpVerifyPage);
route.post('/verifyOTP', verifyOTP);
route.get("/newSetPasswordPage", passport.checkForgetPasswordAuthentication, newSetPasswordPage);
route.post('/checkNewPassword', checkNewPassword);


// For Sign In0
route.get('/', passport.checkForgetPasswordAuthentication, signInPage);
route.post('/signIn', passport.authenticate("local-auth", { failureRedirect: "/" }), adminChecked);

// For Sign Up
route.get('/signUpPage', passport.checkForgetPasswordAuthentication, signUpPage);
route.post('/signUp', upload.single('adminImage'), signUp);

// Dashborad
route.get('/dashboard', passport.checkAuthenticationForLogin, dashboard);

// Adding Admin
route.get('/addAdminPage', passport.checkAuthenticationForLogin, addAdminPage);

// Show Admin Table
route.get('/adminTable', passport.checkAuthenticationForLogin, adminTable);

// View Admin Profile
route.get('/viewProfile', passport.checkAuthenticationForLogin, viewProfile);

// Edit Current Admin
route.get('/editCurrentAdmin/:id', passport.checkAuthenticationForLogin, editCurrentAdmin);
route.post('/updateCurrentAdmin/:id', upload.single('adminImage'), updateCurrentAdmin);

// Logout Admin
route.get('/logOutAdmin', logOutAdmin);

// Change Password 
route.get('/changePasswordPage/:id', passport.checkAuthenticationForLogin, changePasswordPage);
route.post('/updatePassword', updatePassword)

// Admin CURD :- 

// Insert...
route.post('/adminInset', upload.single('adminImage'), adminInsert);

// Delete...
route.get('/deleteAdmin/:deleteId', passport.checkAuthenticationForLogin, deleteAdmin);

// EditAdmin Page Render...
route.get('/editAdmin/:id', passport.checkAuthenticationForLogin, editAdminPage);

// Updating...
route.post('/updateAdmin/:id', upload.single('adminImage'), updateAdmin);

// Category Routing...
route.use("/category", passport.checkAuthenticationForLogin, require("./categoryRoutes"));

// Sub Category Routing...
route.use("/subCategory", passport.checkAuthenticationForLogin, require("./subCategoryRoutes"));

// Sub Category Routing...
route.use("/extraCategory", passport.checkAuthenticationForLogin, require("./extraCategoryRoutes"));


module.exports = route;