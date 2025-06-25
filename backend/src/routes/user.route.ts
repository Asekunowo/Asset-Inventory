import {Router} from "express";
import {changePassword, createUser, deleteUser, getOneUser, getUsers, updateUser} from "../controllers/user.controller";
import {verifyToken} from "../middlewares/auth";
import {passwordChangeLimit} from "../utils/limits";

const router: Router = Router();

router.get("/getoneuser/:id", getOneUser);
router.post("/createuser", createUser);

router.use(verifyToken);

router.put("/updateuser/:id", updateUser);
router.get("/getusers", getUsers);
router.put("/passchg", passwordChangeLimit, changePassword);
router.delete("/deleteuser/:id", deleteUser);

export default router;
