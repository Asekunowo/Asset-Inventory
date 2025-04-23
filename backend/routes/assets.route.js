const express = require("express");
const {
  getAssets,
  updateAsset,
  addNewAsset,
  deleteAsset,
} = require("../controllers/assets.controller.js");
const { verifyToken } = require("../middlewares/auth.js");
const router = express.Router();

router.get("/get", verifyToken, getAssets);
router.put("/edit/:id", verifyToken, updateAsset);
router.post("/new/:id", verifyToken, addNewAsset);
router.delete("/del/:id", verifyToken, deleteAsset);

module.exports = router;
