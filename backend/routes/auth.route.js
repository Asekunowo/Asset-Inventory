const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { route } = require("./user.route");

const router = Router();

router.post("/login", login);

module.exports = router;
