import User from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  // res.send("Logging in");
  const { email, password } = req.body;

  // 1) Check if the user exists in the DB and exit if it does not exist
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid request");

  // 2) Check if the hashes match (with Bcrypt) stored password hash in the DB === sent password hashed
  const match = await bcrypt.compare(password, user.password);

  // 3) Send an answer: hey you're logged in / you are not logged in
  if (!match) return res.status(400).send("Invalid request");

  const token = user.createToken();

  res.set("x-authorization-token", token).send("Login successful"); // user is authenticated and we send a JWT with information about that specific user
};
