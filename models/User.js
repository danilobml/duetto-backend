import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ["teacher", "student"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    phone: { type: String },
    location: { type: String },
    instruments: [String],
    styles: [String],
    in_person: { type: Boolean, required: true },
    online: { type: Boolean, required: true },
    price: { type: Number },
    min_price: { type: Number },
    max_price: { type: Number },
    profile_picture: { type: String },
    audio: { type: String },
    video: { type: String },
    availability: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User
