const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    phone: { type: String },
    location: { type: String },
    instruments: [String],
    styles: [String],
    in_person: { type: Boolean, required: true },
    online: { type: Boolean, required: true },
    min_price: { type: Number },
    max_price: { type: Number },
    profile_picture: { type: String },
    audio: { type: String },
    video: { type: String },
    availability: [],
    matches: [String],
    rejections: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema);

module.exports = User;
