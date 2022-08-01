const express = require("express");
const Rejection = require("../models/rejections");

const get_user_rejections = async (req, res) => {
  const { id } = req.params;
  try {
    const getRejections = await Rejection.find({ $uid: id });
    res.json(getRejections);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const create_new_rejection = async (req, res) => {
  console.log(req.body);
  const { uid, tid } = req.body;
  const rejection = { uid: uid, tid: tid };
  try {
    const createdRejection = await Rejection.create(rejection);
    res.json(createdRejection);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { get_user_rejections, create_new_rejection };
