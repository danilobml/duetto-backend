import express from "express"
import User from "../models/User.js"

export const get_logged_user = async (req, res) => {
  const { email } = req.params;
  try {
    const getLoggedUser = await User.findOne({ $email: email });
    res.json(getLoggedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const get_other_users = async (req, res) => {
  const { email } = req.params;
  try {
    const getUsers = await User.find({ email: { $ne: email } });
    res.json(getUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const create_new_user = async (req, res) => {
  const user = req.body;
  try {
    const createdUser = await User.create(user);
    res.json(createdUser);
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
