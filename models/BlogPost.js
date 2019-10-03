const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    authorId: mongoose.Schema.Types.ObjectId,
    authorUserId: String,
    authorLocation: [String],
    authorAdminPrvlg: Boolean,
    authorUserId: String,
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
    }
});

mongoose.model("comments", CommentSchema);
mongoose.model("blogPosts", BlogSchema);