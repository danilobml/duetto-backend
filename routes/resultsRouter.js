import express from "express"
export const resultsRouter = express.Router();
import { get_user_results, upsert_result } from "../controllers/resultsController.js"

// this :id should be replaced by authed user
resultsRouter.get("/:id", get_user_results);

resultsRouter.post("/", upsert_result);