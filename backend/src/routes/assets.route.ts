import { Router } from "express";

import {
  getAssets,
  updateAsset,
  addNewAsset,
  deleteAsset,
} from "../controllers/assets.controller";

import { verifyToken } from "../middlewares/auth";
import {
  addNewOther,
  getOtherAssets,
  updateOtherAsset,
} from "../controllers/others.controller";

const router: Router = Router();

router.use(verifyToken);

router.get("/get", getAssets);
router.post("/add", addNewAsset);
router.put("/update/:id", updateAsset);

router.delete("/delete/:id", deleteAsset);

router.post("/addother", addNewOther);
router.put("/updateother/:id", updateOtherAsset);
router.get("/others", getOtherAssets);

export default router;
