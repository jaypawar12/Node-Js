const brts = require('../model/brtsSchema');
const fs = require('fs');
const path = require('path');

// Display all BRTS routes on the homepage

const homePage = async (req, res) => {
    try {
        const routes = await brts.find();
        res.render('homePage', { routes });
    } catch (error) {
        console.error('Error fetching BRTS routes:', error);
    }
};

// Render the form to add a new BRTS route

const addBrts = (req, res) => {
    res.render('addBrts');
};

// Insert new BRTS route into the database

const brtsInsert = async (req, res) => {
    try {
        // Handle image upload path
        if (req.file) {
            console.log('Image Path:', req.body.busImage);  
            req.body.busImage = path.join('uploads', req.file.filename);
        }

        const newBrts = await brts.create(req.body);
        console.log('BRTS route added:', newBrts);

        res.redirect('/');
    } catch (error) {
        console.error('Insert Error:', error);
    }
};

// Delete a BRTS route and its associated image

const deleteBrts = async (req, res) => {
    const id = req.query.id;

    try {
        const route = await brts.findByIdAndDelete(id);

        if (route) {
            // Delete image file if it exists
            const imagePath = path.join(__dirname, '..', route.busImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('Image deleted successfully');
            }

            console.log('BRTS route deleted');
        } else {
            console.log('Route not found');
        }

        res.redirect('/');
    } catch (error) {
        console.error('Delete Error:', error);
    }
};

// Render the form to update an existing BRTS route

const updateBrts = async (req, res) => {
    try {
        const route = await brts.findById(req.params.id);

        if (!route) {
           console.log('BRTS route not found');
        }

        res.render('editBrts', { record: route });
    } catch (error) {
        console.error('Error loading update form:', error);
    }
};


// Exporting all controller functions
module.exports = {
    homePage,
    addBrts,
    brtsInsert,
    deleteBrts,
    updateBrts,
};
