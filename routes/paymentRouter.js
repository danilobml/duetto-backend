import express from "express";
import { payment } from "../controllers/paymentController.js";

import { authorizeUser } from "../middlewares/authorizeUser.js";

export const paymentRouter = express.Router();

paymentRouter.post("/", authorizeUser, payment);
