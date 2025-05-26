import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import {
  addMovement,
  deleteMovement,
  getAllMovements,
  getMovements,
  updateMovement,
} from "../controllers/movement.controller";

const router: Router = Router();

router.use(verifyToken);

router.get("/get", getMovements);
router.get("/all", getAllMovements);
router.post("/add", addMovement);

router.put("/update/:id", updateMovement);
router.delete("/delete/:id", deleteMovement);

export default router;
