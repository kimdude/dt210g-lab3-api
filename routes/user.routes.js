/* Routes for handling users */
const controller = require("../controllers/user.controller");

module.exports = (server) => {
    server.route([

        //Adding user
        {
            method: "POST",
            path: "/user/register",
            handler: controller.addUser,
        },

        //Logging in user
        {
            method: "POST",
            path: "/user/login",
            handler: controller.loginUser
        }
        
    ])
}

