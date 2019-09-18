const express = require("express");
const router = express.Router();

// login
router.get("/login", (req,res) => {
    res.send("login");
});

// register
router.get("/register", (req,res) => {
    res.send("register");
});



module.exports = router;