/* Routes for handling posts */
const controller = require("../controllers/blog.controller");

module.exports = (server) => {
    server.route([
        
        //Getting all posts
        {
            method: "GET",
            path: "/blog",
            handler: controller.getBlogs,
            options: {
                auth: {
                    strategy: "jwt"
                }
            }
        },

        //Getting specific post
        {
            method: "GET",
            path: "/blog/{_id}",
            handler: controller.getBlog,
            options: {
                auth: {
                    strategy: "jwt"
                }
            }
        },

        //Adding post
        {
            method: "POST",
            path: "/blog",
            handler: controller.addBlog,
            options: {
                auth: {
                    strategy: "jwt"
                }
            }
        }

        //Updating post

        //Delete post

    ])
}