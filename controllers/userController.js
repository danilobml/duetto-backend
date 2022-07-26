import User from "../models/User.js";
import bcrypt from "bcrypt";

export const get_all_users = async (req, res) => {
  try {
    const getAllUsers = await User.find({});
    res.json(getAllUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const get_other_users = async (req, res) => {
  const { email } = req.params;
  try {
    const loggedUser = await User.findOne({ email: email });

    const getUsers = await User.find({ email: { $ne: email }, _id: { $nin: loggedUser.rejections }, role: { $ne: loggedUser.role } });
    res.json(getUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const get_filtered_other_users = async (req, res) => {
  const { email } = req.params;
  let { f } = req.query;

  console.log(f);

  try {
    const loggedUser = await User.findOne({ email: email });
    let getUsers = [];
    if (f) {
      f = f.split(",");
      const queryFilterObject = {};
      f.filter((x) => x !== "instruments" && x !== "styles").forEach((filterKey) => {
        queryFilterObject[filterKey] = loggedUser[filterKey];
      });
      // f.filter(x=> x === "instruments" && x === "styles").forEach((filterKey) => {
      //   queryFilterObject[filterKey] = loggedUser[filterKey];
      // });
      console.log(f);
      console.log(queryFilterObject);
      getUsers = await User.find({ ...queryFilterObject, email: { $ne: email }, _id: { $nin: loggedUser.rejections }, role: { $ne: loggedUser.role } });
    } else {
      getUsers = await User.find({ email: { $ne: email }, _id: { $nin: loggedUser.rejections }, role: { $ne: loggedUser.role } });
    }
    res.json(getUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const get_filtered_users = async (req, res) => {
  const { email, filter } = req.params;
  if (filter === "location" || filter === "online" || filter === "in_person") {
    try {
      const loggedUser = await User.findOne({ email: email });
      const getUsers = await User.find({ email: { $ne: email }, _id: { $nin: loggedUser.rejections }, _id: { $nin: loggedUser.selections }, role: { $ne: loggedUser.role }, filter: loggedUser[filter] });
      res.json(getUsers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    try {
      const loggedUser = await User.findOne({ email: email });
      const getUsers = await User.find({ email: { $ne: email }, _id: { $nin: loggedUser.rejections }, _id: { $nin: loggedUser.selections }, role: { $ne: loggedUser.role }, filter: { $nin: loggedUser[filter] } });
      res.json(getUsers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export const get_logged_user = async (req, res) => {
  const { email } = req.params;
  try {
    const getLoggedUser = await User.findOne({ email: email });
    res.json(getLoggedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const user_check = async (req, res) => {
  const { email } = req.body;

  const exists = await User.findOne({ email: email });

  if (exists) {
    res.send("invalid");
  } else {
    res.status(200).send(email);
  }
};

export const create_new_user = async (req, res) => {
  const { name, role, email, password, age, phone, location, instruments, style, in_person, online, price, min_price, max_price, profile_picture, audio, video, availability } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      role,
      email,
      password: hashedPassword,
      age,
      phone,
      location,
      instruments,
      style,
      in_person,
      online,
      price,
      min_price,
      max_price,
      profile_picture,
      audio,
      video,
      availability,
    });

    const token = newUser.createToken();

    res.send({ email, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const partially_update_user = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;
  try {
    const { modifiedCount } = await User.updateOne({ _id: id }, { [key]: value });
    if (!modifiedCount) return res.status(404).send("user not found");
    res.send("The user was updated successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export const fully_update_user = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).send("User not found");
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
};
