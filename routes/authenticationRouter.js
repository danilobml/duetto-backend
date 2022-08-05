import express from "express";
export const authenticationRouter = express.Router();
import { login } from "../controllers/authenticationController.js";

authenticationRouter.post("/login", login);
