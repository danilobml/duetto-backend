import express from "express";
import { payment } from "../controllers/paymentController.js";

export const paymentRouter = express.Router();

paymentRouter.post("/", payment);
