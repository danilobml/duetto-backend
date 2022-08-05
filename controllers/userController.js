import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const get_all_users = async (req, res) => {
  try {
    const getAllUsers = await User.find({});
    res.json(getAllUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const get_logged_user = async (req, res) => {
  const { email } = req.params;
  try {
    const getLoggedUser = await User.findOne({ email: email });
    res.json(getLoggedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const get_other_users = async (req, res) => {
  const { email } = req.params;
  try {
    const loggedUser = await User.findOne({ email: email });
    const getUsers = await User.find({ email: { $ne: email }, _id: { $nin: loggedUser.rejections } });
    res.json(getUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const create_new_user = async (req, res) => {
  const { name, role, email, password, age, phone, location, instruments, style, in_person, online, price, min_price, max_price, profile_picture, audio, video, availability } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      role,
      email,
      password: hashedPassword,
      age,
      phone,
      location,
      instruments,
      style,
      in_person,
      online,
      price,
      min_price,
      max_price,
      profile_picture,
      audio,
      video,
      availability,
    });

    const token = newUser.createToken();

    res.set("x-authorization-token", token).json({ _id: newUser._id, email: newUser.email });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const partially_update_user = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;
  try {
    const { modifiedCount } = await User.updateOne({ _id: id }, { [key]: value });
    if (!modifiedCount) return res.status(404).send("user not found");
    res.send("The user was updated successfully");
  } catch (error) {
    console.log(error.message);
  }
};
