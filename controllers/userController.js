const express = require("express");
const loggedUserData = require("../data/mockDataLoggedUser.json");

const get_user = (req, res) => {
  res.send(loggedUserData);
};

module.exports = { get_user };
