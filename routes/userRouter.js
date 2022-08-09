import express from "express";
export const userRouter = express.Router();
import { get_all_users, get_logged_user, get_other_users, create_new_user, partially_update_user, fully_update_user, user_check } from "../controllers/userController.js";

import { authorizeUser } from "../middlewares/authorizeUser.js";

userRouter.get("/", get_all_users);

userRouter.post("/check", user_check);

userRouter.get("/logged_user/:email", get_logged_user);

userRouter.get("/:email", get_other_users);

userRouter.post("/create", create_new_user);

userRouter.patch("/:id", partially_update_user);

userRouter.put("/:id", fully_update_user);
