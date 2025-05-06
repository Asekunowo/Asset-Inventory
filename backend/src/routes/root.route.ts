import { Router } from "express";

import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import assetRoutes from "./assets.route";
import repairRoutes from "./repairs.route";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/assets", assetRoutes);
router.use("/repairs", repairRoutes);

export default router;
