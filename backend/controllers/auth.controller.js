const { default: mongoose } = require("mongoose");
const { dbConn } = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { SECRET_KEY } = require("../secrets");
const { compareSync } = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    await dbConn();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    if (!compareSync(password, user.password)) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);

    res
      .status(200)
      .json({ success: true, message: "User Authorized", token, user });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to login" });
  } finally {
    mongoose.disconnect();
  }
};

module.exports = {
  login,
};
