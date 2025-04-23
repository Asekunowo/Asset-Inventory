const express = require("express");
const {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  changePassword,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/getusers", verifyToken, getUsers);
router.get("/getoneuser/:id", getOneUser);
router.post("/createuser", createUser);
router.put("/passchg/:id", changePassword);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
