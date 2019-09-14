const express = require("express");
const exphbs = require("express-handlebars");
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
const blogPost = mongoose.model("blogPosts");
const users = mongoose.model("users");
//////////////end database connection//////////////////////////


// handlebars middleware/////////////////////////////////
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
///end handlebars middleware//////////////////////////

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
///end body parser middleware//////////////////////////

// public static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    const title = "Homestead Automation";
    res.render("index", {
        title: title
    });
});

// add a post
app.get("/posts/add", (req, res) => {
    const title = "Homestead Automation-Add Post";
    res.render("posts/add", {
        title:title
    });
});

// process new post form
app.post("/posts", (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({text: "Please add a title"}); 
    }
    if (!req.body.postBody) {
        errors.push({text: "Please add a post body"}); 
    }

    if (errors.length > 0) {
        res.render("/posts/add", {
            errors: errors,
            title: req.body.title,
            body: req.body.postBody
        });
    } else {
        res.send("passed");
    }
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