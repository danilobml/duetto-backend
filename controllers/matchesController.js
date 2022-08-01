const express = require("express");
const Match = require("../models/Matches");

const get_user_matches = async (req, res) => {
  const { id } = req.params;
  try {
    const getMatches = await Match.find({ $uid: id });
    res.json(getMatches);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const create_new_match = async (req, res) => {
  console.log(req.body);
  const { uid, tid } = req.body;
  const match = { uid: uid, tid: tid };
  try {
    const createdMatch = await Match.create(match);
    res.json(createdMatch);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { get_user_matches, create_new_match };
