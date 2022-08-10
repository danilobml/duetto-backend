import express from "express";
export const chatRouter = express.Router();

import { messages } from "../controllers/chatController.js";

chatRouter.post("/", messages);
