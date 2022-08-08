import express from "express";
export const bookingsRouter = express.Router();
import { get_user_bookings, get_combined_bookings, create_new_booking } from "../controllers/bookingsController.js";

// this :id should be replaced by authed user
bookingsRouter.get("/:id", get_user_bookings);

bookingsRouter.get("/", get_combined_bookings);

bookingsRouter.post("/", create_new_booking);
