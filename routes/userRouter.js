const express = require("express");
const userRouter = express.Router();
const { get_user } = require("../controllers/userController");

userRouter.get("/", get_user);

module.exports = userRouter;
