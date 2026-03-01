const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema);