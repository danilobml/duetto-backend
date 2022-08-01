const express = require("express");
const resultsRouter = express.Router();
const { get_user_results, create_new_result } = require("../controllers/resultsController");

resultsRouter.get("/:id", get_user_results);

resultsRouter.post("/create", create_new_result);

module.exports = resultsRouter;
