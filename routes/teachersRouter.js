const express = require("express");
const teachersRouter = express.Router();
const { all_teachers } = require("../controllers/teachersController");

teachersRouter.get("/", all_teachers);

module.exports = teachersRouter;
