"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"],
                additionalHeaders: ["authorization", "Content-Type"]
            }
        }
    });

    mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to database: "+ error);
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