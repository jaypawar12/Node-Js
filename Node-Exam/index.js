const express = require('express');
const db = require('./config/db')
const port = 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))

app.use('/', require('./routes/brtsRoutes'));

app.listen(port, (err) => {
    if(err){
        console.log("Something Went Wrong...");
    }
    console.log(`Server Is Started at http://localhost:${port}`);
});