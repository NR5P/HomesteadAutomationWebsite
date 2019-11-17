const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: function(req,file,cb) {
        cb(null,file.fieldname + "-" + req.body.userId + "-" + file.originalname)
    }
});

const upload = multer({
    storage: storage
}).single("avatar",2);

// load user model
require("../models/User");
const User = mongoose.model("users");

// login
router.get("/login", (req,res) => {
    res.render("users/login");
});

// login form POST
router.post("/login", (req,res,next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req,res,next);
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

// Logout
router.get("/logout", (req,res) => {
    req.logout();
    req.flash("success_msg", "You Are Logged Out");
    res.redirect("/");
});

// user profile
router.get("/userProfile/:id", (req,res) => {
    User.findOne({_id:req.params.id})
        .then(user => {
            const title = user.userName;
            res.render("users/userProfile", {
                title: title,
                user: user
            });

        })
})

// edit user profile with additional information //TODO: working on now
router.post("/userProfile/:id", (req,res) => {
    upload(req,res,(err) => {
        if (err) {
            res.render(`/userProfile/${req.params.id}`)
        } else {
            User.findOne({_id:req.params.id})
            .then(user => {
                user.userName = req.body.userName;
                user.email = req.body.email;
                user.contact.city = req.body.city;
                user.contact.state = req.body.state;
                user.contact.zip = req.body.zip;
                user.contact.phoneNumber = req.body.phoneNumber;
                user.avatarCrop = new Map(Object.entries(req.body.avatarCoordinates));
                user.avatarLink = req.file.path;
                console.log(req.file);
                user.save()
                    .then(user => {
                        req.flash("success_msg", "profile updated");
                        res.redirect("/");
                    })
            })
        }
    })
})

module.exports = router;