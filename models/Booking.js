import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    teacher_id: { type: mongoose.Types.ObjectId, required: true },
    student_id: { type: mongoose.Types.ObjectId, required: true },
    teacher_name: { type: String, required: true },
    teacher_email: { type: String },
    teacher_phone: { type: String },
    student_name: { type: String, required: true },
    student_email: { type: String },
    student_phone: { type: String },
    payed: { type: Boolean, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    online: { type: Boolean, required: true },
    confirmed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

export default Booking;
