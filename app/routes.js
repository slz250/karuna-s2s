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

    app.post("/login", passport.authenticate("loginStrategy", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }));

    app.get("/signup", function(req,res) {
        res.render("signuplink.hbs", {message: req.flash("signup_msg")});
    });

    app.post("/signup", passport.authenticate('signupStrategy'), {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });

    app.get('/profile', checkLoggedIn, function(req, res) {
       res.render('profile.hbs', {
           user: req.user
       });
    });

    app.get('/logout', function(req, res) {
       req.logout();
       res.render('/');
    });

    app.get('/listing', checkLoggedIn, function(req, res) {
        let call_, SMS, meet_up;
        if (Object.keys(req.query).length !== 0) {
            call_ = req.query.call_;
            SMS = req.query.SMS;
            meet_up = driver.get_meet_up(req.query.meet_up);
        }

        Listing.find({$or:[{call_: call_},
            {SMS: SMS},
            {meet_up: meet_up},]},
            (err, result) => {
                res.render("listings.hbs", {result: result});
            })
    })
};