const express = require("express");
const {
  getRepairs,
  addNewRepairs,
} = require("../controllers/repairs.controller");

const router = express.Router();

router.get("/get", getRepairs);
router.post("/new/:id", addNewRepairs);

module.exports = router;
