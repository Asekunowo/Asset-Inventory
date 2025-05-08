import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { addExit, getMovements } from "../controllers/movement.controller";

const router: Router = Router();

router.use(verifyToken);

router.get("/get", getMovements);
router.post("/new", addExit);

export default router;
