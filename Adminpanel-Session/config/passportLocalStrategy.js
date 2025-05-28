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

                return done(null, false, { message: "Incorrect email." });
            }

            if (admin.adminPassword == adminPassword) {
                console.log("login Success..");
                return done(null, admin, { message: "Password Match" });

            } else {
                console.log("login Failed");
                return done(null, false, { message: "Incorrect password." });
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