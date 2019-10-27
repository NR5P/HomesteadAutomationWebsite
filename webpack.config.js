const path = require("path");

module.exports = {
    entry: {
        app: "./public/javascript/app.js",
        postView: "./public/javascript/postView.js",
        userProfile: "./public/javascript/userProfile.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname,"./public/javascript/bundles"),
    },
};