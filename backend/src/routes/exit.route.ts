import { Router } from "express";
import { addExit, getExits, updateExit } from "../controllers/exit.controller";

const router = Router();

import { verifyToken } from "../middlewares/auth";

router.use(verifyToken);

router.post("/add", addExit);

router.get("/get", getExits);

router.put("/update/:id", updateExit);

export default router;
