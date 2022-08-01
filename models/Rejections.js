const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rejectionSchema = new Schema(
  {
    uid: { type: String, required: true },
    tid: { type: String, required: true },
  },
  { timestamps: true }
);

const Rejection = mongoose.model("Rejection", rejectionSchema);

module.exports = Rejection;
