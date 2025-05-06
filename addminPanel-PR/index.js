const express = require('express');
const db = require('./config/adminDB');
const cookieParser = require('cookie-parser')

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use('/', require('./routes/adminRoutes'));

app.listen(port, (err) => {
    if(err){
        console.log("Something Went Wrong In Server...", err);
    } else {
        console.log(`Server is Started At http://localhost:${port}`);
    }
});
