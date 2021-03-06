const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    contact: [
        {
            city: String
        },
        {
            state: String
        },
        {
            zip: String
        },
        {
            phoneNumber: String
        }
    ],
    dateJoined: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    avatarCrop: {
        type: Map
    },
    avatarLink: {
        type: String
    }
});

mongoose.model("users", UserSchema);