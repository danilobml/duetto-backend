const express = require("express");
const rejectionsRouter = express.Router();
const { get_user_rejections, create_new_rejection } = require("../controllers/rejectionsController");

rejectionsRouter.get("/:id", get_user_rejections);

rejectionsRouter.post("/create", create_new_rejection);

module.exports = rejectionsRouter;
