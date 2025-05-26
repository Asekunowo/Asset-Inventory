import { Router } from "express";
import {
  getAssetsReport,
  getExitsReport,
  getMovementsReport,
  getOthersAssetsReport,
  getRepairsReport,
} from "../controllers/reports.controller";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.use(verifyToken);

router.post("/exits", getExitsReport);

router.post("/movements", getMovementsReport);

router.post("/repairs", getRepairsReport);

router.post("/assets", getAssetsReport);

router.post("/otherassets", getOthersAssetsReport);

export default router;
