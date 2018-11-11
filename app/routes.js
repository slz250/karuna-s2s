const mongoose = require("mongoose");
require("./models/listing.js");
const Listing = mongoose.model("Listing")

module.exports = function(app, passport) {
    app.get("/", function(req, res) {
        res.render("homepage.hbs");
    });

    app.get("/login", function(req, res) {
        res.render("login.hbs", {message: req.flash("login_msg")});
    });

    //TODO: check documentation on passport.authenticate(~)
    app.post("/login", passport.authenticate("loginStrategy", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }));

    app.get("/signup", function(req,res) {
        //TODO: how does flash msgs work
        res.render("signuplink.hbs", {message: req.flash("signup_msg")});
    });

    app.post("/signup", passport.authenticate('signupStrategy'), {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });

    //TODO: middleware is checkLoggedIn?
    app.get('/profile', checkLoggedIn, function(req, res) {
       res.render('profile.hbs', {
           user: req.user
       });
    });

    app.get('/logout', function(req, res) {
        //TODO: req.logout()?
       req.logout();
       res.render('/');
    });

    app.get('/listing', checkLoggedIn, function(req, res) {
        if (Object.keys(req.query).length !== 0) {

        }
    })
};