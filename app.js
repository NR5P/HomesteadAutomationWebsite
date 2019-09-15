const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();


//Database connection/////////////////////////////////////////
mongoose.connect("mongodb://localhost/homestead-web-app", {
    useNewUrlParser: true
})
.then(() => {
    console.log("mongodb connected");
})
.catch(err => console.log(err));

// load models
require("./models/BlogPost");
require("./models/User");
const BlogPost = mongoose.model("blogPosts");
const User = mongoose.model("users");
//////////////end database connection//////////////////////////


// handlebars middleware/////////////////////////////////
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
///end handlebars middleware//////////////////////////

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
///end body parser middleware//////////////////////////

// method override middleware
app.use(methodOverride("_method"));
//end method override middlewar//////////////////////////

// public static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    const title = "Homestead Automation";
    BlogPost.find({})
        .sort({date:"desc"})
        .then(posts => {
            res.render("index", {
                title: title,
                posts: posts
            });
        });
});

// add a post
app.get("/posts/add", (req, res) => {
    const title = "Homestead Automation-Add Post";
    res.render("posts/add", {
        title:title
    });
});

// edit a post
app.get("/posts/edit/:id", (req, res) => {
    const title = "Homestead Automation-Edit Post";
    BlogPost.findOne({
        _id: req.params.id
    })
    .then(post => {
        res.render("posts/edit", {
            post:post
        });
    })
});


// process new post form
app.post("/posts", (req, res) => {
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
                res.redirect("/");
            });
    }
});

// edit form process
app.put("/posts/:id", (req,res) => {
    BlogPost.findOne({
        _id: req.params.id
    })
    .then(post => {
        // new values
        post.postTitle = req.body.postTitle;
        post.postBody = req.body.postBody;

        post.save()
            .then(post => {
                res.redirect("/");
            })
    });
});

// delete post
app.delete("/posts/:id", (req,res) => {
    BlogPost.remove({
        _id: req.params.id
    })
    .then(() => {
        res.redirect("/");
    });
});

app.get("/about", (req, res) => {
    const title = "About Homestead Automation"
    res.render("about", {
        title:title
    });
});

app.get("/contact", (req, res) => {
    title = "Contact Homestead Automation";
    res.render("contact", {
        title:title
    });
});

// if port not specified on server than use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});