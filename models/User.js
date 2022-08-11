import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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
    in_person: { type: Boolean },
    online: { type: Boolean },
    price: { type: Number },
    min_price: { type: Number },
    max_price: { type: Number },
    profile_picture: { type: String },
    audio: { type: String },
    video: { type: String },
    availability: [],
    selections: [String],
    rejections: [String],
    level: { type: String, enum: ["beginner", "intermediate", "adavanced"] },
  },
  { timestamps: true }
);

userSchema.methods.createToken = function () {
  const payload = { _id: this._id };
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
