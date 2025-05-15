import { Router } from "express";
import { addExit, getExits } from "../controllers/exit.controller";

const router = Router();

router.post("/add", addExit);

router.get("/get", getExits);

export default router;
