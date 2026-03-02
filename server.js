"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const user = require("./models/user.model");

const validate = async (decoded, request, h) => {
    try {
        const result = await user.findOne({ _id: decoded.id});

        if(!result) {
            return { isaValid: false }
        }

        const currentUser = {
            _id: result._id,
            username: result.username
        }

        return { isValid: true, credentials: currentUser }

    } catch(error) {
        console.log("An error occurred during validation: " + error);
    }
}

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: "0.0.0.0",
        routes: {
            cors: {
                origin: ["*"],
                additionalHeaders: ["Authorization", "Content-Type"]
            }
        }
    });

    mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to database: "+ error);
    })

    await server.register(require("hapi-auth-jwt2"));
    server.auth.strategy("jwt", "jwt", {
        key: process.env.JWT_SECRET_KEY,
        validate
    })

    require("./routes/user.routes")(server);
    require("./routes/blog.routes")(server);

    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (error) => {
    console.log("An error occurred connecting to server: " + error);
    process.exit(1);
});

init();