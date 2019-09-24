const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {ensureAuthenticated} = require("../helpers/auth");


// load model
require("../models/BlogPost");
const BlogPost = mongoose.model("blogPosts");

// view individual post TODO: working on now
router.get("/view/:id", (req,res) => {
    BlogPost.findOne({
        _id: req.params.id
    })
    .then(post => {
        const title = post.postTitle;
        res.render("posts/postView", {
            post: post,
            title: title
        });
    });
});


// add a post
router.get("/add", ensureAuthenticated, (req, res) => {
    const title = "Homestead Automation-Add Post";
    res.render("posts/add", {
        title:title
    });
});

// add a comment to a post
router.get("/comment/:id", ensureAuthenticated, (req, res) => {
    //TODO: check or no comment and add flash message if not
})

// edit a post
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
    const title = "Homestead Automation-Edit Post";
    BlogPost.findOne({
        _id: req.params.id
    })
    .then(post => {
        res.render("posts/edit", {
            title: title,
            post:post
        });
    });
});


// process new post form
router.post("/", (req, res) => {
    let errors = [];
    if (!req.body.postTitle) {
        errors.push({text: "Please add a title"}); 
    }
    if (!req.body.postBody) {
        errors.push({text: "Please add a post body"}); 
    }

    if (errors.length > 0) {
        res.render("posts/add", {
            errors: errors,
            postTitle: req.body.postTitle,
            postBody: req.body.postBody
        });
    } else {
        const newPost = {
            postTitle: req.body.postTitle,
            postBody: req.body.postBody
        }
        new BlogPost(newPost)
            .save()
            .then(post => {
                req.flash("success_msg", "post added");
                res.redirect("/");
            });
    }
});

// edit form process
router.put("/:id", ensureAuthenticated, (req,res) => {
    BlogPost.findOne({
        _id: req.params.id
    })
    .then(post => {
        // new values
        post.postTitle = req.body.postTitle;
        post.postBody = req.body.postBody;

        post.save()
            .then(post => {
                req.flash("success_msg", "post updated");
                res.redirect("/");
            })
    });
});

// delete post
router.delete("/:id", ensureAuthenticated, (req,res) => {
    BlogPost.remove({
        _id: req.params.id
    })
    .then(() => {
        req.flash("success_msg", "post removed");
        res.redirect("/");
    });
});


module.exports = router;