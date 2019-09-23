const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    postBody: {
        type: String,
        required: true
    },
    comments: [
        { 
            body: String
        },
        {
            author: mongoose.Schema.Types.ObjectId
        },
        {
            date: Date
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("blogPosts", BlogSchema);