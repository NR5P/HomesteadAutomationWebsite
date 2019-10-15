const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {ensureAuthenticated} = require("../helpers/auth");


// load models
require("../models/BlogPost");
require("../models/User");
const BlogPost = mongoose.model("blogPosts");
const Comments = mongoose.model("comments");
const Users = mongoose.model("users");


// add a post
router.get("/add", ensureAuthenticated, (req, res) => {
    const title = "Homestead Automation-Add Post";
    res.render("posts/add", {
        title:title
    })
});

// view individual post TODO: working on now
router.get("/:id", (req,res) => {
    BlogPost.findOne({
        _id: req.params.id
    })
    .then(post => {
        const title = post.postTitle;
        res.render("posts/postView", {
            post: post,
            title: title
        })
    }).catch(err=>console.log(err))
});



// retrieve comments from a post
router.get("/api/:id", (req, res) => {
    BlogPost.findOne({
        _id: req.params.id
    })
    .then(post => {
        if (post.comments)
            res.json(post.comments);
    })
    .catch(err=>res.json(err))
});

// add a comment to a post 
router.post("/api", (req, res) => {
    let newComment = {};
    let errors = [];
    if (!req.body.commentBody) {
        errors.push({text: "Please add a comment"}); 
        res.json(errors);
    }
    Users.findOne({
        _id: req.user._id
    })
    .then(user => {
        newComment = {
            commentBody: req.body.commentBody,
            authorId: user._id,
            authorUserName: user.userName,
            authorLocation: user.contact,
            authorAdminPrvlg: user.admin,
            authorDateJoined: user.dateJoined
        }
    })
    .then(BlogPost.findOne({
        _id: req.body.postId
    })
    .then(post => {
        post.comments.push(new Comments(newComment));
        post.save();
        res.json(newComment)
    })
    .catch(err=>res.json(err))
)});

/*
// modify a comment //TODO:
router.put("/api/comment/:id", ensureAuthenticated, (req, res) => {

})

// delete a comment TODO:
router.delete("/api/comment/postid:/commentid:")
    BlogPost.findOne({
        _id: req.params.postid
    })
    .then(post => {
        post.children.id(req.params.commentid).remove();
    })
    .then(response => {
        res.json(response);
    })
*/

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
        })
        .catch(err=>console.log(err));
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
        }).catch(err=>console.log(err));
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