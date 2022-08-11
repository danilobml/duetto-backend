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
  const { me, them } = req.params;
  try {
    const getResults = await Result.find({
      $and: [{ $or: [{ uid1: me }, { uid2: them }] }, { $or: [{ uid1: me }, { uid2: them }] }],
    });
    res.json(getResults);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const create_new_result = async (req, res) => {
  const { uid1, uid2, chatChannel, status } = req.body;
  try {
    const newResult = await Result.create({
      uid1,
      uid2,
      chatChannel,
      status,
    });
    res.json(newResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
