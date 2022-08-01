const express = require("express");
const Result = require("../models/Result");

const get_user_results = async (req, res) => {
  const { id } = req.params;
  try {
    const getResults = await Result.find({ $uid: id });
    res.json(getResults);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const create_new_result = async (req, res) => {
  console.log(req.body);
  const { uid, tid } = req.body;
  const result = { uid: uid, tid: tid };
  try {
    const createdResult = await Result.create(result);
    res.json(createdResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { get_user_results, create_new_result };
