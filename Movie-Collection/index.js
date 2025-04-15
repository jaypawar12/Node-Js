const express = require('express');
const db = require('./config/db');
const path = require('path');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Passing Data By URI For encoding
app.use('/uploads/',express.static(path.join(__dirname, 'uploads'))); // Middlewear

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Server is Not Started.....!`, err);
    }
    console.log(`Server is Stating....! http://localhost:${port}`);
})
