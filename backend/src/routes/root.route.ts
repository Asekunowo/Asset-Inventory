import { Router } from "express";

import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import assetRoutes from "./assets.route";
import repairRoutes from "./repairs.route";
import movementRoutes from "./movement.route";
import staffRoutes from "./staff.route";
import exitRoutes from "./exit.route";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/assets", assetRoutes);
router.use("/repairs", repairRoutes);
router.use("/movements", movementRoutes);
router.use("/staffs", staffRoutes);
router.use("/exits", exitRoutes);

export default router;
