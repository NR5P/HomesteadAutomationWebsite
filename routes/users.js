const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//const passport = require("passport");
const router = express.Router();

// load user model
require("../models/User");
const User = mongoose.model("users");

// login
router.get("/login", (req,res) => {
    res.render("users/login");
});

// register
router.get("/register", (req,res) => {
    res.render("users/register");
});

// register form POST
router.post("/register", (req,res) => {
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({text: "Passwords don't match"});
    }

    if (req.body.password.length < 4) {
        errors.push({text: "Password must be at least 4 characters"});
    }

    if (errors.length > 0) {
        res.render("users/register", {
             errors:errors,
             userName: req.body.userName,
             email: req.body.email,
             password: req.body.password,
             password2: req.body.password2
        })
    } else {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    req.flash("error_msg", "There's already an account with that email");
                    res.redirect("/register");
                } else {
                    User.findOne({userName: req.body.userName})
                        .then(user => {
                            if (user) {
                                req.flash("error_msg", "There's already a user with that user name");
                                res.redirect("/register");
                            } else {
                                const newUser = new User({
                                    userName: req.body.userName,
                                    email: req.body.email,
                                    password: req.body.password 
                                });
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                                        if (err) throw err;
                                        newUser.password = hash;
                                        newUser.save()
                                            .then(user => {
                                                req.flash("success_msg", "You are now registered");
                                                res.redirect("/login");
                                            })
                                            .catch(err=> {
                                                console.log(err);
                                                return;
                                            })
                                    });
                                })
                            }
                        })
                } 
        });
    }
})

module.exports = router;