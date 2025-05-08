import { Router } from "express";

import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import assetRoutes from "./assets.route";
import repairRoutes from "./repairs.route";
import movementRoutes from "./movement.route";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/assets", assetRoutes);
router.use("/repairs", repairRoutes);
router.use("/movements", movementRoutes);

export default router;
