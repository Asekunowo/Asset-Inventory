const express = require("express");
const {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/getusers", getUsers);
router.get("/getoneuser/:id", getOneUser);
router.post("/createuser", createUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
