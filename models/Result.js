import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { RESULT_ENUM } from "../enums.js";

const resultSchema = new Schema(
  {
    uids: [mongoose.Types.ObjectId],
    results: {
      uid1: {
        _id: mongoose.Types.ObjectId,
        status: { type: String, enum: Object.values(RESULT_ENUM) },
      },
      uid2: {
        _id: mongoose.Types.ObjectId,
        status: { type: String, enum: Object.values(RESULT_ENUM) },
      },
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("result", resultSchema);

export default Result;
