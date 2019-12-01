const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    authorId: mongoose.Schema.Types.ObjectId,
    authorUserName: String,
    authorLocation: [String],
    authorAdminPrivlg: {
        type: Boolean,
        default: false
    },
    authorDateJoined: Date,
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
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

mongoose.model("comments", CommentSchema);
mongoose.model("blogPosts", BlogSchema);