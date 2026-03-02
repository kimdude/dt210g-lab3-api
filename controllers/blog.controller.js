/* Controller to handle blog posts */
const Post = require("../models/blog.model");
const User = require("../models/user.model");

//Getting all posts
exports.getBlogs = async (request, h) => {
    
    const { limit, skip } = request.query;

    //Queries for pagination
    let start = 0;
    let end = start +10;             

    if(skip) {
        start = Number(skip);
    }

    try {
        let result;

        //Validation of queries
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

            //Fetch with limit
            result = await Post.find().skip(start).limit(end)

        } else {

            //Fetch without limit
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

        //Response with username
        const result = {
            title: data.title,
            text: data.text,
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

        //Fetching post
        const data = await Post.findOne({ _id });

        if(!data) {                                
            throw new Error("Invalid post ID");
        }

        const user = await User.findOne({ _id: data.user_id });

        //Response with username
        const result = {
            title: data.title,
            text: data.text,
            user_id: data.user_id,
            username:  user.username,
            created: data.createdAt,
            updated: data.updatedAt
        }        

        return h.response(result).code(200);

    } catch(error) {

        if(error.message === "Invalid post ID") {
            return h.response({ error: error.message }).code(404);
        }

        return h.response({ error: "An error occurred fetching the post: " + error.message }).code(500);
    }
    
}

//Updating post
exports.updateBlog = async (request, h) => {
    try {

        const { title, text } = request.payload;
        const { _id } = request.params;

        const username = request.auth.credentials.username;
        const user_id= request.auth.credentials._id;

        //Updating
        const data = await Post.findOneAndUpdate({ _id: _id }, { title, text }, { returnDocument: "after" });

        if(!data) {
            throw new Error("Invalid post ID");
        }

        //Response with username
        const result = {
            title: data.title,
            text: data.text,
            user_id: user_id,
            username:  username,
            created: data.createdAt,
            updated: data.updatedAt
        }   

        return h.response(result).code(200);

    } catch(error) {

        if(error.message === "Invalid post ID") {
            return h.response({ error: error.message }).code(404);
        }

        return h.response({ error: "An error occurred updating post: " + error.message }).code(500);
    }
    
}

//Delete post
exports.deleteBlog = async (request, h) => {
    try {
        const { _id } = request.params;

        //Deleting
        const result = await Post.deleteOne({ _id });

        if(result.deletedCount === 0) {
            throw new Error("Invlid post ID");
        }

        return h.response({ message: "Post deleted" }).code(200);
    } catch(error) {

        if(error.message === "Invlid post ID") {
            return h.response({ error: error.message }).code(404);
        }

        return h.response({ error: "An error occurred deleting post: " + error.message }).code(500);
    }
    
}