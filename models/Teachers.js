const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teachersSchema = new Schema(
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
    price: { type: Number, required: true },
    profile_picture: { type: String },
    audio: { type: String },
    video: { type: String },
    availability: [],
    matches: [String],
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teachersSchema);

module.exports = Teacher;