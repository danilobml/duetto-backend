const express = require("express");
const userRouter = express.Router();
const { get_logged_user, get_other_users, create_new_user, partially_update_user } = require("../controllers/userController");

userRouter.get("/logged_user/:email", get_logged_user);

userRouter.get("/:email", get_other_users);

userRouter.post("/create", create_new_user);

userRouter.patch("/:id", partially_update_user);

module.exports = userRouter;
