import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { RESULT_ENUM } from "../enums.js";

const resultSchema = new Schema(
  {
    uid1: { type: mongoose.Types.ObjectId, required: true },
    uid2: { type: mongoose.Types.ObjectId, required: true },
    status: Object.values(RESULT_ENUM),
  },
  { timestamps: true }
);

const Result = mongoose.model("result", resultSchema);

export default Result;
