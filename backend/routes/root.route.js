const { Router } = require("express");

const userRoutes = require("./user.route.js");
const assetRoutes = require("./assets.route.js");
const authRoutes = require("./auth.route.js");

const router = Router();

router.use("/users", userRoutes);
router.use("/assets", assetRoutes);
router.use("/auth", authRoutes);

module.exports = router;
