const express = require("express");
const testRouter = express.Router();
const { say_hi } = require("../controllers/testController");

testRouter.get("/", say_hi);

module.exports = testRouter;
