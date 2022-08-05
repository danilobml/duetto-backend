import express from "express";
export const resultsRouter = express.Router();
import { get_user_results, get_combined_results, create_new_result } from "../controllers/resultsController.js";

// this :id should be replaced by authed user
resultsRouter.get("/:id", get_user_results);

resultsRouter.get("/", get_combined_results);

resultsRouter.post("/", create_new_result);
