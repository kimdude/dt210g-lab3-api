const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: [30, "Title must be under 30 characters long."]
    },
    text: {
        type: String,
        minlength: [10, "Text must be over 10 characters long."]
    },
    user:  {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);