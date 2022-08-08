import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";

export const get_user_bookings = async (req, res) => {
  // WARNING REPLACE THIS WITH AUTH ID
  const { id } = req.params;
  try {
    const getBookings = await Booking.find({ $or: [{ uid1: id }, { uid2: id }] });
    res.json(getBookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const get_combined_bookings = async (req, res) => {
  // WARNING REPLACE THIS WITH AUTH ID
  const { me, them } = req.body;
  try {
    const getBookings = await Booking.find({ $or: [{ uid1: req.session._id }, { uid2: req.session._id }], status1: RESULT_ENUM.ACCEPT, status2: RESULT_ENUM.ACCEPT });
    res.json(getBookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const create_new_booking = async (req, res) => {
  const { teacher_id, student_id, teacher_name, teacher_email, teacher_phone, student_name, student_email, student_phone, payed, date, time, online, status } = req.body;
  try {
    const newBooking = await Booking.create({
      teacher_id,
      teacher_name,
      teacher_email,
      teacher_phone,
      student_id,
      student_name,
      student_email,
      student_phone,
      payed,
      date,
      time,
      online,
      status,
    });

    res.json(newBooking);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const partially_update_booking = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;
  try {
    const { modifiedCount } = await Booking.updateOne({ _id: id }, { [key]: value });
    if (!modifiedCount) return res.status(404).send("Booking not found");
    res.send("The booking was updated successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_booking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findOneAndDelete({ _id: id });
    if (!deletedBooking) return res.status(404).send("Booking not found");
    res.json(deletedBooking);
  } catch (error) {
    console.log(error.message);
  }
};
