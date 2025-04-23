const express = require("express");
const {
  getRepairs,
  addNewRepairs,
} = require("../controllers/repairs.controller");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/get", verifyToken, getRepairs);
router.post("/new/:id", addNewRepairs);

module.exports = router;
