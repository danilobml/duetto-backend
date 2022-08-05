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

// user interaction - swipe
// swipe trigger API call
// API create result doc
// matches component fetches "matches" from / results /: id

// [{
//   uid: String,
//   resultStatus: { type: String, enum: Object.values(RESULT_ENUM) }
// }]
// axios.post(URL, { me: 123, them: 321, myAction: "MATCH" })

// const x = await Result.create({
//   uids: [mongoose.Types.ObjectId("594ced02ed345b2b049222c5"), mongoose.Types.ObjectId("594ced02ed345b2b049222c6")],
//   results: {
//     uid1: {
//       _id: mongoose.Types.ObjectId("594ced02ed345b2b049222c5"),
//       status: RESULT_ENUM.ACCEPT,
//     },
//     uid2: {
//       _id: mongoose.Types.ObjectId("594ced02ed345b2b049222c6"),
//       status: RESULT_ENUM.ACCEPT,
//     },
//   },
// });

// console.log(x);

// db.locations.update({_id: 'store1'}, {$set: {'notes': { _id :  ObjectId("47cc67093475061e3d95369d")}}})

// console.log(existingresult)
// const x = await Result.count({})
// const x = await Result.deleteMany({})
// console.log({ x });

export const upsert_result = async (req, res) => {
  const { me, them, myAction } = req.body;
  console.log(me, them);
  try {
    const foundResult = await Result.findOne({ uids: { $all: [me, them] } });
    if (foundResult) {
      console.log("existing result found", foundResult);
      const modifiedResult = {
        uids: foundResult.uids,
        createdAt: foundResult.createdAt,
        results: {
          ...foundResult.results,
          [foundResult.results.uid1._id === me ? "uid1" : "uid2"]: myAction,
        },
      };
      console.log({ modifiedResult });
      const x = Result.findByIdAndUpdate(mongoose.Types.ObjectId(foundResult._id), modifiedResult);
      res.json({ x });
    } else {
      console.log("no result found, making new result document");
      const newResult = await Result.create({
        uids: [mongoose.Types.ObjectId(me), mongoose.Types.ObjectId(them)],
        results: {
          uid1: {
            _id: mongoose.Types.ObjectId(me),
            status: myAction,
          },
          uid2: {
            _id: mongoose.Types.ObjectId(them),
            status: RESULT_ENUM.PENDING,
          },
        },
      });
      console.log({ newResult });
      res.json(newResult);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Result.findOne({ uids: { $all: [me, them] } }, {"results."});
