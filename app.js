const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();

// public static folder
app.use(express.static(path.join(__dirname, "public")));


// load model
require("./models/BlogPost");
const BlogPost = mongoose.model("blogPosts");


//load routes
const blog = require("./routes/blog");
const users = require("./routes/users");
const admin = require("./routes/admin");

// Passport config
require("./config/passport")(passport);


//Database connection/////////////////////////////////////////
mongoose.connect("mongodb://localhost/homestead-web-app", {
    useNewUrlParser: true
})
.then(() => {
    console.log("mongodb connected");
})
.catch(err => console.log(err));

// load models
require("./models/User");
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

// express session middleware//////////////////////////
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
///end express session middleware/////////////////////

///connect flash middleware//////////////////////////
app.use(flash());
///end connect flash middleware//////////////////////////

//global variables//////////////////////////////////////
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})
//end global variables//////////////////////////////////////


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


// User routes
app.use("/posts", blog);
app.use("/", users);
app.use("/", admin);

// if port not specified on server than use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});