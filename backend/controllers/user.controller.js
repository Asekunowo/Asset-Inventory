const { default: mongoose } = require("mongoose");
const { dbConn } = require("../config/dbconfig");
const { hashSync } = require("bcrypt");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    await dbConn();
    const user = await User.find();

    return res
      .status(200)
      .json({ success: true, message: "Users fetched", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Could not fetch data" });
  } finally {
    mongoose.disconnect();
  }
};

const createUser = async (req, res) => {
  const user = req.body;

  const newUser = new User({ ...user, password: hashSync(user.password, 10) });

  try {
    await dbConn();

    const isUserExists = await User.findOne({ email: req.body.email });

    if (isUserExists) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created",
      newUser,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to create user" });
  } finally {
    mongoose.disconnect();
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid id" });
    return;
  }

  try {
    await dbConn();
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "No user with this id exists" });
      return;
    }

    res.status(200).json({ success: true, message: "User found", user });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "User not found" });
    return;
  } finally {
    mongoose.disconnect();
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid id" });
    return;
  }

  try {
    await dbConn();

    const isUserExists = await User.findByIdAndDelete(id);
    if (!isUserExists) {
      res
        .status(404)
        .json({ success: false, message: "No user with this id exists" });
      return;
    }

    res.status(200).json({ success: true, message: "User deleted!" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to delete user" });
    return;
  } finally {
    mongoose.disconnect();
  }
};

module.exports = {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
};
