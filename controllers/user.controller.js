/* Controller for handling user */
const model = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Adding new user
exports.addUser = async (request, h) => {
    try {
        const { username, password } = request.payload;

        //Hashing password and creating user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new model({ username: username, password: hashedPassword });

        //Saving user
        const savedUser = await newUser.save();

        return h.response({ message: "User has been added.", username: savedUser.username}).code(200);

    } catch(error) {

        if(error.code === 11000) {
            return h.response({ error: "Invalid username or password." }).code(409);
        }

        return h.response({ error: "An error occurred storing user. Please try again later." }).code(500);
    }
}

//Logging in user
exports.loginUser = async (request, h) => {
    try {
        const { username, password } = request.payload;
        
        //Validating username
        const validUser = await model.findOne({ username: username }).select( "password").select( "username");

        if(!validUser) {
            throw new Error("Invalid username or password");
        }

        //Validating password
        const validPassword = await bcrypt.compare(password, validUser.password);

        if(!validPassword) {
            throw new Error("Invalid username or password");
        }

        //Creating jwt-token
        const payload = { id: validUser._id, username: validUser.username }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

        return h.response({ user_id: validUser._id,username: validUser.username, token: token }).code(200);

    } catch(error) {

        if(error.message === "Invalid username or password") {
            return h.response({ error: error.message }).code(401);
        }

        return h.response({ error: "An error occurred during login. Please try again later." }).code(500);
    }
}