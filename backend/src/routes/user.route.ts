import { Router } from "express";
import {
  getUsers,
  createUser,
  getOneUser,
  changePassword,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";

const router: Router = Router();

router.get("/getoneuser/:id", getOneUser);
router.post("/createuser", createUser);

router.use(verifyToken);

router.get("/getusers", getUsers);
router.put("/passchg", changePassword);

export default router;
