import { Router } from "express";
import {
  addStaff,
  getStaff,
  getStaffById,
} from "../controllers/staff.controller";

const router: Router = Router();

// POST /staff - Add a new staff member
router.post("/add", addStaff);
router.get("/get", getStaff);
router.get("/getstaff/:id", getStaffById);

export default router;
