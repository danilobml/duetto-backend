const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    uid1: { type: String, required: true },
    uid2: { type: String, required: true },
  },
  { timestamps: true }
);

const Result = mongoose.model("result", resultSchema);

module.exports = Result;
