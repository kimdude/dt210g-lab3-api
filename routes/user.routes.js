/* Routes for handling users */
const controller = require("../controllers/user.controller");

module.exports = (server) => {
    server.route([

        //Adding user
        {
            method: "POST",
            path: "/user/register",
            handler: controller.addUser,
            options: {
                auth: { 
                    strategy: "jwt"
                }
            }
        },

        //Logging in user
        {
            method: "POST",
            path: "/user/login",
            handler: controller.loginUser
        },

        //Validating token
        {
            method: "GET",
            path: "/user/validate",
            handler: (request, h) => {
                const user = request.auth.credentials;

                if(!user) {
                    return h.response({message: "Invalid token"}).code(401);
                }
                return h.response(user).code(200)
            },
            options: {
                auth: { 
                    strategy: "jwt"
                }
            }
        }
        
    ])
}

