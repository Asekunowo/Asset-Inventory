import { Router } from "express";
import { login, logout } from "../controllers/auth.controller";

import { verifyToken } from "../middlewares/auth";

import { loginLimit } from "../utils/limits";

const router: Router = Router();

router.post("/login", loginLimit, login);

router.post("/logout", verifyToken, logout);

export default router;
