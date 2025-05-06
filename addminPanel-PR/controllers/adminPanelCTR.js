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
const adminTable = async (req, res) => {
    let records = await adminDetails.find({});

    console.log("Admin Data", records);

    res.render('adminTable', { records });
}
const viewProfile = async (req, res) => {
    
    res.render('adminProfile');
}

// Admin CURD 

const adminInsert = (req, res) => {
    // For Debuging...
    console.log(req.body);
    console.log(req.file);

    try {
        req.body.adminImage = req.file.path;

        const adminInsert = adminDetails.create(req.body);
        if (adminInsert) {
            console.log("Admin Inserted");
        } else {
            console.log("Admin Not Insertion");
        }
        res.redirect('/addAdminPage')
    } catch {
        res.send(`<p> Not Found : ${e} </p>`);
    }

}
const deleteAdmin = async (req, res) => {
    const deleteId = req.params.deleteId;

    try {

        const data = await adminDetails.findById(deleteId);

        if (data) {
            console.log(data.adminImage);

            fs.unlinkSync(data.adminImage);

            await adminDetails.findByIdAndDelete(deleteId);

            res.redirect('/adminTable');
        } else {
            console.log("Single Record not found....");

        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }

}
const editAdminPage = async (req, res) => {
    const editId = req.params.id;

    try {
        const record = await adminDetails.findById(editId);

        if (record) {
            res.render('editAdminPage', { record });
        } else {
            res.send(`<p> Admin record not found </p>`);
        }
    } catch (e) {
        res.send(`<p> Error: ${e} </p>`);
    }
}
const updateAdmin = async (req, res) => {
    const updateId = req.params.id;

    try {
        const existingData = await adminDetails.findById(updateId);

        if (!existingData) {
            res.send(`<p> Admin record not found </p>`);
        }

        if (req.file) {
            fs.unlinkSync(existingData.adminImage);
            req.body.adminImage = req.file.path;
        } else {
            req.body.adminImage = existingData.adminImage;
        }

        await adminDetails.findByIdAndUpdate(updateId, req.body);

        res.redirect(`/adminTable`);
    } catch (e) {
        res.send(`<p> Update Failed: ${e} </p>`);
    }
}



module.exports = {
    signInPage,
    signUpPage,
    dashboard,
    addAdminPage,
    adminTable,
    viewProfile,
    adminInsert,
    editAdminPage,
    updateAdmin,
    deleteAdmin,
};