const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    author: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now
    }
});

const BlogSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    postBody: {
        type: String,
        required: true
    },
    comments: [CommentSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("comments", CommentSchema);
mongoose.model("blogPosts", BlogSchema);