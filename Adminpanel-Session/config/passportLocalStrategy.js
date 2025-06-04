const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const adminDetails = require("../models/adminModel");

// Configure Passport.js to use the local strategy
passport.use("local-auth", new LocalStrategy(
    {
        usernameField: "adminEmail",
        passwordField: "adminPassword"
    },
    async function (adminEmail, adminPassword, done) {
        console.log("LocalStrategy is running");

        try {
            // Find admin by email
            const admin = await adminDetails.findOne({ adminEmail: adminEmail });

            if (!admin) {
                console.log("Email is Wrong..");

                return done(null, false);
            }

            if (admin.adminPassword == adminPassword) {
                console.log("login Success..");
                return done(null, admin);

            } else {
                console.log("login Failed");
                return done(null, false);
            }

        } catch (err) {
            return done(err);
        }
    }
)
);

passport.serializeUser(function (admin, done) {
    console.log("serializeUser called");
    return done(null, admin.id);
})

passport.deserializeUser(async function (id, done) {
    console.log("deserializeUser called");
    const userData = await adminDetails.findById(id);
    if (userData) {
        return done(null, userData);
    } else {
        return done(null, false);
    }
});


// Check Login MiddleWare
passport.checkAuthenticationForLogin = function (req, res, next) {
    console.log("Authentication For Login Middlewate is Called...");

    console.log("Auth : ", req.isAuthenticated());

    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

// Forget Password
passport.checkForgetPasswordAuthentication = function (req, res, next) {
    console.log("Forget Password Authentication Middlewate is Called...");

    console.log("Auth : ", req.isAuthenticated());

    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

// currentAdmin Data
passport.currentAdmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.currentAdmin = req.user;
        next();
    } else {
        next();
    }
}

module.exports = passport;