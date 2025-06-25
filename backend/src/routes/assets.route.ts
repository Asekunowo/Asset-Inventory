import {Router} from "express";

import {addMultipleAssets, addNewAsset, deleteAsset, getAssets, updateAsset} from "../controllers/assets.controller";

import {addNewOther, deleteOtherAsset, getOtherAssets, updateOtherAsset} from "../controllers/others.controller";
import {verifyToken} from "../middlewares/auth";

const router: Router = Router();

router.use(verifyToken);

router.get("/get", getAssets);
router.post("/add", addNewAsset);
router.put("/update/:id", updateAsset);

router.delete("/delete/:id", deleteAsset);

router.post("/newbatch", addMultipleAssets);

router.post("/addother", addNewOther);
router.put("/updateother/:id", updateOtherAsset);
router.get("/others", getOtherAssets);
router.delete("/deleteothers/:id", deleteOtherAsset);

export default router;
