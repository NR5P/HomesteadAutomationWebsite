const path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        app: "./public/javascript/app.js",
        postView: "./public/javascript/postView.js",
        userProfile: "./public/javascript/userProfile.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname,"./public/javascript/bundles"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: "style-loader!css-loader"
            },
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ] 
    },
    resolve: {
    }
};