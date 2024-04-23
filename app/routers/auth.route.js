const express = require("express");
const userRouter = express.Router();
const auths = require("../controllers/auth.controller");

// Route to create a new user
userRouter.route("/users")
    .post(auths.createUser);

// Route to find a user by ID
userRouter.route("/:id")
    .get(auths.findUserById);

module.exports = userRouter;
