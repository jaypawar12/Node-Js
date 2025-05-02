const adminDetails = require('../models/adminModel');
const fs = require('fs');

const signInPage = (req, res) => {
    res.render('signInPage');
};
const signUpPage = (req, res) => {
    res.render('signUpPage');
};
const dashboard = (req, res) => {
    res.render('dashboard');
}
const addAdminPage = (req, res) => {
    res.render('addAdminPage');
}
const adminTable = async(req, res) => {
    let records = await adminDetails.find({});

    console.log("Admin Data", records);

    res.render('adminTable', {records});
}

// Admin CURD 
const adminInsert = (req, res) => {
    // For Debuging...
    console.log(req.body);
    console.log(req.file);

    try{
        req.body.adminImage = req.file.path;

        const adminInsert = adminDetails.create(req.body);
        if(adminInsert){
            console.log("Admin Inserted");
        }else{
            console.log("Admin Not Insertion");
        }
        res.redirect('/addAdminPage')
    }catch{
        res.send(`<p> Not Found : ${e} </p>`);
    }
    
}


module.exports = {
    signInPage,
    signUpPage,
    dashboard,
    adminInsert,
    addAdminPage,
    adminTable,
};