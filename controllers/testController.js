const express = require("express");

const say_hi = (req, res) => {
  res.send(`<h1>Hey</h1>`);
};

module.exports = { say_hi };
