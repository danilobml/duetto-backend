import express from "express";
import mongoose from "mongoose";
import Result from "../models/Result.js";
import { RESULT_ENUM } from "../enums.js"


export const get_user_results = async (req, res) => {
  // WARNING REPLACE THIS WITH AUTH ID 
  const { me, them } = req.params;
  try {
    const getResults = await Result.find({ $or: [{ uid1: req.session._id }, { uid2: req.session._id }], status1: RESULT_ENUM.ACCEPT, status2: RESULT_ENUM.ACCEPT })
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

const x = await Result.create({
  "uids": [mongoose.Types.ObjectId("594ced02ed345b2b049222c5"), mongoose.Types.ObjectId("594ced02ed345b2b049222c6")],
  "results": {
    "uid1": {
      _id: mongoose.Types.ObjectId("594ced02ed345b2b049222c5"),
      status: RESULT_ENUM.ACCEPT
    },
    "uid2": {
      _id: mongoose.Types.ObjectId("594ced02ed345b2b049222c6"),
      status: RESULT_ENUM.ACCEPT
    }
  }
});
// db.locations.update({_id: 'store1'}, {$set: {'notes': { _id :  ObjectId("47cc67093475061e3d95369d")}}})

// console.log(existingresult)
// const x = await Result.count({})
// const x = await Result.deleteMany({})
console.log({ x })

export const upsert_result = async (req, res) => {
  const {
    me,
    them,
    myAction } = req.body;
  try {
    console.log(mongoose.Types.ObjectId(me))
    $all: [me, them]
    const existingresult = await Result.find({ uids: { $all: [me, them] } })
    // const existingresult = await Result.findOne({
    //   $or:
    //     [{
    //       $and:
    //         [
    //           { uid1: mongoose.Types.ObjectId(me) },
    //           { uid2: mongoose.Types.ObjectId(them) }
    //         ]
    //     }, {
    //       $and:
    //         [
    //           { uid1: mongoose.Types.ObjectId(them) },
    //           { uid2: mongoose.Types.ObjectId(me) }
    //         ]
    //     }]
    // })
    // TODO update existing or create result collection object


    console.log(existingresult)
    res.json(existingresult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// create result 
// uid1 uid2

// upsert 
// update if exists, otherwise insert

