const express = require("express");
// const loggedUserData = require("../data/mockDataLoggedUser.json");
const User = require("../models/User");

const get_user = async (req, res) => {
  try {
    const getUser = await User.find({});
    res.json(getUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const create_new_user = async (req, res) => {
  const user = req.body;
  try {
    const createdUser = await User.create(user);
    res.json(createdUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const partially_update_user = async (req, res) => {
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

module.exports = { get_user, create_new_user, partially_update_user };
