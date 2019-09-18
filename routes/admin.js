const express = require("express");
const router = express.Router();

router.get("/contact", (req, res) => {
    title = "Contact Homestead Automation";
    res.render("contact", {
        title:title
    });
});


router.get("/about", (req, res) => {
    const title = "About Homestead Automation"
    res.render("about", {
        title:title
    });
});


module.exports = router;