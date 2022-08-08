import User from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("Invalid request");
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).send("Invalid request");

  const token = user.createToken();

  res.send({ email, token });
};
