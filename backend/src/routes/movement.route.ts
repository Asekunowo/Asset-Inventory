import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { addMovement, getMovements } from "../controllers/movement.controller";

const router: Router = Router();

router.use(verifyToken);

router.get("/get", getMovements);
router.post("/add", addMovement);

export default router;
