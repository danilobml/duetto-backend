const express = require("express");
const userRouter = express.Router();
const { get_user, create_new_user, partially_update_user } = require("../controllers/userController");

userRouter.get("/", get_user);

userRouter.post("/", create_new_user);

userRouter.patch("/:id", partially_update_user);

module.exports = userRouter;
