/* Controller to handle blog posts */
const Post = require("../models/blog.model");
const User = require("../models/user.model");

//Getting all posts
exports.getBlogs = async (request, h) => {
    
    const { limit, skip } = request.query;

    let start = 0;
    let end = start +10;                //KONTROLLER ATT +10 E OK

    if(skip) {
        start = Number(skip);
    }

    try {
        let result;

        if(start < 0) {
            console.log("Fångad av första if-satsen.")
            throw new Error("Query 'skip' must be higher than 0");
        }

        if(isNaN(start)) {
            console.log("Fångad av andra if-satsen.")
            throw new Error("Query 'skip' must be a number");
        }

        if(limit) {
            end = Number(limit);

            if(isNaN(end)) {
                throw new Error("Query 'end' must be a number");
            }

            result = await Post.find().skip(start).limit(end)

        } else {
            result = await Post.find().skip(start);
        }

        return h.response(result).code(200);

    } catch(error) {

        if(error.message === "Query 'skip' must be higher than 0" || error.message === "Query 'skip' must be a number" || error.message === "Query 'limit' must be a number" ) {

            return h.response({ error: error.message }).code(409);
        }

        return h.response({ error: "An error occurred fetching posts: " + error.message }).code(500);
    }

}

//Adding post
exports.addBlog = async (request, h) => {
    try {
        const { title, text } = request.payload;
        const user_id = request.auth.credentials._id;

        const post = new Post({title, text, user_id});
        const data = await post.save();

        const result = {
            title: data.title,
            content: data.text,
            user_id: data.user_id,
            username:  request.auth.credentials.username,
            created: data.createdAt,
            updated: data.updatedAt
        }

        return h.response(result).code(200);

    } catch(error) {
        return h.response({ error: "An error occurred adding the post: " + error.message }).code(500);
    }
    
}

//Getting specific post
exports.getBlog = async (request, h) => {
    try {
        const { _id } = request.params;

        const data = await Post.findOne({ _id });

        if(!data) {                                 //FÖRBÄTTRA FELHANTERINGEN
            crossOriginIsolated.log("test")
            throw new Error("Invalid post ID");
        }

        const user = await User.findOne({ _id: data.user_id });

        const result = {
            title: data.title,
            content: data.text,
            user_id: data.user_id,
            username:  user.username,
            created: data.createdAt,
            updated: data.updatedAt
        }        

        return h.response(result).code(200);

    } catch(error) {

        if(error.message === "Invalid post ID") {
            return h.response({ error: error.message }).code(409);
        }

        return h.response({ error: "An error occurred fetching the post: " + error.message }).code(500);
    }
    
}

//Updating post
exports.updateBlogs = async (request, h) => {
    try {
        
    } catch(error) {}
    
}

//Delete post
exports.deleteBlogs = async (request, h) => {
    try {

    } catch(error) {}
    
}