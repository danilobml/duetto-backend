import express from "express";
import mongoose from "mongoose";
import Result from "../models/Result.js";
import { RESULT_ENUM } from "../enums.js";

export const get_user_results = async (req, res) => {
  // WARNING REPLACE THIS WITH AUTH ID
  const { id } = req.params;
  try {
    const getResults = await Result.find({ $or: [{ uid1: id }, { uid2: id }] });
    res.json(getResults);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const get_combined_results = async (req, res) => {
  // WARNING REPLACE THIS WITH AUTH ID
  const { me, them } = req.body;
  try {
    const getResults = await Result.find({ $or: [{ uid1: req.session._id }, { uid2: req.session._id }], status1: RESULT_ENUM.ACCEPT, status2: RESULT_ENUM.ACCEPT });
    res.json(getResults);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const create_new_result = async (req, res) => {
  const { uid1, uid2, status } = req.body;
  try {
    const newResult = await Result.create({
      uid1,
      uid2,
      status,
    });
    res.json(newResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
