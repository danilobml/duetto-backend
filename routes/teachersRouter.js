const express = require("express");
const teachersRouter = express.Router();
const { get_all_teachers, create_new_teacher, partially_update_teacher } = require("../controllers/teachersController");

teachersRouter.get("/", get_all_teachers);

teachersRouter.post("/", create_new_teacher);

teachersRouter.patch("/:id", partially_update_teacher);

module.exports = teachersRouter;
