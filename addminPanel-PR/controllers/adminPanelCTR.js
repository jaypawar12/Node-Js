const adminDetails = require('../models/adminModel');
const fs = require('fs');


// Sign In Admin
const signInPage = (req, res) => {
    console.log(req.cookies.admin);
    if (req.cookies.admin == undefined) {
        res.render('signInPage');
    } else {
        res.redirect('/dashboard')
    }
};

const adminChecked = async (req, res) => {
    const { adminEmail, adminPassword } = req.body;

    try {
        const adminData = await adminDetails.findOne({ adminEmail });

        if (adminData) {
            if (adminData.adminPassword === adminPassword) {
                console.log("Admin Login Successfully..!");
                res.cookie('admin', adminData);
                res.redirect('/dashboard');
            } else {
                console.log("Password Doesn't Matched");
                res.redirect('/signInPage');
            }
        } else {
            console.log("Email Doesn't Matched");
            res.redirect('/signInPage');
        }

    } catch (e) {
        res.send(`<p> Error: ${e} </p>`);
    }
};


// Sign Up Admin
const signUpPage = (req, res) => {
    res.render('signUpPage');
};

const signUp = (req, res) => {
    console.log(req.cookies.admin);
    if (req.cookies.admin == undefined) {
        res.render('signUpPage');
    } else {
        res.redirect('/dashboard')
    }
}

// Rendering Page
const dashboard = (req, res) => {
    if (req.cookies.admin == undefined) {
        res.redirect('/signInPage')
    } else {
        const currentAdmin = req.cookies.admin;
        console.log(currentAdmin);
        res.render('dashboard', { currentAdmin });
    }
}
const addAdminPage = (req, res) => {
    if (req.cookies.admin == undefined) {
        res.render('/signInPage');
    } else {
        res.render('addAdminPage');
    }
}
const viewProfile = async (req, res) => {
    console.log(req.cookies.admin);
    const currentAdmin = req.cookies.admin;
    if (currentAdmin != undefined) {
        res.render('adminProfile', {currentAdmin});
    } else {
        res.redirect('/signInPage')
    }
}

// Admin Table
const adminTable = async (req, res) => {
    if (req.cookies.admin == undefined) {
        res.redirect('/signInPage');
    } else {
        try {
            let records = await adminDetails.find({});
            const currentAdmin = req.cookies.admin;

            console.log("Admin Data", records);

            res.render('adminTable', { records, currentAdmin});
        }catch (e){
            res.send(`<p> Not Found : ${e} </p>`);
        }
    }
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
        res.send(`<p> Error : ${e} </p>`);
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
        res.send(`<p> Error : ${e} </p>`);
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
    adminChecked,
    signUpPage,
    signUp,
    dashboard,
    addAdminPage,
    adminTable,
    viewProfile,
    adminInsert,
    editAdminPage,
    updateAdmin,
    deleteAdmin,
};