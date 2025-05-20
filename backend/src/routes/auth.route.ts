import { Router } from "express";
import { login, logout } from "../controllers/auth.controller";

import { loginLimit } from "../utils/limits";

const router: Router = Router();

router.post("/login", login);

router.post("/logout", logout);

export default router;
