import { Router } from "express";

import {
  getAssets,
  updateAsset,
  addNewAsset,
  deleteAsset,
} from "../controllers/assets.controller";

import { verifyToken } from "../middlewares/auth";
import { addNewOther, getOtherAssets } from "../controllers/others.controller";

const router: Router = Router();

router.use(verifyToken);

router.get("/get", getAssets);
router.put("/edit/:id", updateAsset);
router.post("/new", addNewAsset);
router.delete("/del/:id", deleteAsset);

router.post("/newother", addNewOther);
router.get("/others", getOtherAssets);

export default router;
