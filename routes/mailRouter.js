import express from "express";
export const mailRouter = express.Router();

import { send_mail } from "../controllers/mailController.js";

mailRouter.post("/send", send_mail);
