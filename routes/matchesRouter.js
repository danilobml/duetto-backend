const express = require("express");
const matchesRouter = express.Router();
const { get_user_matches, create_new_match } = require("../controllers/matchesController");

matchesRouter.get("/:id", get_user_matches);

matchesRouter.post("/create", create_new_match);

module.exports = matchesRouter;
