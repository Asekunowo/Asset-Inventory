import { Router } from "express";
import {
  addExit,
  deleteExit,
  getExits,
  updateExit,
} from "../controllers/exit.controller";

const router = Router();

import { verifyToken } from "../middlewares/auth";

router.use(verifyToken);

router.post("/add", addExit);

router.get("/get", getExits);

router.put("/update/:id", updateExit);

router.delete("/delete/:id", deleteExit);

export default router;
