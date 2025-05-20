import { Router } from "express";
import { verifyToken } from "../middlewares/auth";

import {
  getRepairs,
  addNewRepairs,
  updateRepair,
} from "../controllers/repairs.controller";

const router: Router = Router();

router.use(verifyToken);

router.get("/get", getRepairs);
router.post("/add", addNewRepairs);

router.put("/update/:id", updateRepair);

export default router;
