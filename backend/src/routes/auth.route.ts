import { Router } from "express";
import { checkSession, login, logout } from "../controllers/auth.controller";

import { loginLimit } from "../utils/limits";
import { verifyToken } from "../middlewares/auth";

const router: Router = Router();

router.post("/login", loginLimit, login);

router.post("/logout", logout);

router.get("/session", verifyToken, checkSession);

export default router;
