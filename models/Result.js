import mongoose from "mongoose"
const Schema = mongoose.Schema;
import { RESULT_ENUM } from "../enums.js"

// const resultSchema = new Schema(
//   {
//     uid1: { type: mongoose.Types.ObjectId, required: true },
//     uid2: { type: mongoose.Types.ObjectId, required: true },
//     match1: { type: String, enum: Object.values(RESULT_ENUM) },
//     match2: { type: String, enum: Object.values(RESULT_ENUM) }
//   },
//   { timestamps: true }
// );

const resultSchema = new Schema(
  {
    uids: [mongoose.Types.ObjectId],
    "results": {
      "uid1": {
        _id: mongoose.Types.ObjectId,
        status: { type: String, enum: Object.values(RESULT_ENUM) }
      },
      "uid2": {
        _id: mongoose.Types.ObjectId,
        status: { type: String, enum: Object.values(RESULT_ENUM) }
      }
    }
  },
  { timestamps: true }
);

// db.people.update({}, { $set: { "address.street": "Main Street" } })
// db.users.update({ _id: 123 }, {
//   $set: {
//     "friends.$[updateFriend].emails.$[updateEmail].email : "lucy.is.gucy@zmail.com"
// }}, {
//   "arrayFilters": [
//     { "updateFriend.name": "lucy" },
//     { "updateEmail.email": "lucyGucy@zmail.com" }
//   ]
// })
// {
//   uids: [321, 123]($all : [me, them],
//     results {
//     321: "MATCH",
//     123: "MATCH",
//   }
// }

export default mongoose.model("result", resultSchema);


