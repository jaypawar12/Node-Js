const express = require('express');
const db = require('./config/db');
const cars = require('./models/car-showroom');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { log } = require('console');

const app = express();
const port = 9000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // MiddleWare
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }); // File Middleware

app.get('/', (req, res) => {
    cars.find({}).then((record) => {
        // console.log(records);
        res.render('table', { record });
    }).catch((err) => {
        console.log("Error", err);
        res.send(err);
    });
})

// Insert
app.post('/car-inventory', upload.single('image'), async (req, res) => {
    const { id, brand, model, price, color } = req.body;
    console.log(req.file);

    let image = "";
    if (req.file) {
        image = req.file.path;
    }

    try {
        if (id) {
            // Edit
            const data = await cars.findById(id);

            if (image) {
                console.log("New Image");
                fs.unlinkSync(data.image);

                await cars.findByIdAndUpdate(id, {
                    brand,
                    model,
                    price,
                    image,
                    color,
                });

                console.log("Data is Updated (new image)");
                return res.redirect('/');
            } else {
                console.log("Old Image");

                await cars.findByIdAndUpdate(id, {
                    brand,
                    model,
                    price,
                    color,
                    image: data.image,
                });

                console.log("Data is Updated (old image)");
                return res.redirect('/');
            }
        } else {
            // Insert
            await cars.create({
                brand,
                model,
                price,
                color,
                image,
            });

            console.log("Data inserted...");
            return res.redirect('/');
        }
    } catch (err) {
        console.log("Error", err);
        return res.status(500).send("An error occurred");
    }
});

// Fetch
app.get('/form', (req, res) => {
    res.render('form');
})

// Delete
app.get('/delete/:id', async (req, res) => {
    // const id = req.query.id;
    const id = req.params.id;
    console.log("Delete ID", id);

    const data = await cars.findById(id);

    console.log(data);

    fs.unlinkSync(data.image);

    cars.findByIdAndDelete(id).then(() => {
        console.log("Deleted Succussfully..");
    }).catch((err) => {
        console.log("Error", err);
    });

    res.redirect('/');
})

// Edit Route 
app.get("/edit", (req, res) => {
    const id = req.query.id;

    console.log("Update ID", id);


    cars.findById(id).then((record) => {
        console.log(record);
        res.render('edit', { record });
    }).catch((err) => {
        res.redirect('/fetch');
        console.log(err);
    })
})


app.listen(port, (err) => {
    if (err) {
        console.log("server is not start...", err);
        return false;
    } 
    
    console.log(`Server started... http://localhost:${port}`)
});
