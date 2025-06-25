import {Router} from "express";

import assetRoutes from "./assets.route";
import authRoutes from "./auth.route";
import exitRoutes from "./exit.route";
import movementRoutes from "./movement.route";
import repairRoutes from "./repairs.route";
import reportRoutes from "./reports.route";
import staffRoutes from "./staff.route";
import userRoutes from "./user.route";

const appRouter: Router = Router();

appRouter.use("/auth", authRoutes);
appRouter.use("/users", userRoutes);
appRouter.use("/assets", assetRoutes);
appRouter.use("/repairs", repairRoutes);
appRouter.use("/movements", movementRoutes);
appRouter.use("/staffs", staffRoutes);
appRouter.use("/exits", exitRoutes);
appRouter.use("/reports", reportRoutes);

export default appRouter;
