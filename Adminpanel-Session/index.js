const express = require('express');
const db = require('./config/adminDB');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("./config/passportLocalStrategy");
const flash = require("connect-flash");

const app = express();
const port = 8000;

// View engine setup
app.set('view engine', 'ejs');

// Static files
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: "AdminPanel",
    secret: "myJS-Web",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
    },
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/adminRoutes'));

// Server start
app.listen(port, (err) => {
    if (err) {
        console.log("Something Went Wrong In Server...", err);
    } else {
        console.log(`Server is Started At http://localhost:${port}`);
    }
});
