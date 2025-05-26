import { Request, Response } from "express";
import Staff, { IStaff } from "../models/staff.model";
import { dbConn } from "../config/dbconfig";

// POST /api/staff - Add new staff member
export const addStaff = async (req: Request, res: Response) => {
  try {
    await dbConn();

    const requiredFields: (keyof IStaff)[] = [
      "employee_id",
      "employee_name",
      "gender",
      "role",
      "classification",
      "supervisor",
    ];

    for (const field of requiredFields) {
      if (
        !req.body[field] ||
        typeof req.body[field] !== "string" ||
        req.body[field].trim() === ""
      ) {
        res.status(400).json({
          success: false,
          message: `Field '${field}' is required and must be a non-empty string`,
        });
        return;
      }
    }

    const isExists = await Staff.findOne({ employee_id: req.body.employee_id });

    if (isExists) {
      res
        .status(400)
        .json({
          success: false,
          message: "Employee with this id already exists",
        });
      return;
    }

    const staffData = req.body;
    const newStaff = new Staff(staffData);
    await newStaff.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Employee added successfully",
        staff: newStaff,
      });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to add employee", error });
    return;
  }
};

export const getStaff = async (req: Request, res: Response) => {
  try {
    await dbConn();

    const staffList: any = await Staff.find().lean();

    if (!staffList) {
      res
        .status(404)
        .json({ success: false, message: "Staff details not found" });
    }

    res.status(200).json({
      success: true,
      message: "Fetched Staff Details",
      staff: staffList.map((staff: any) => ({
        ...staff,
        createdAt: staff.createdAt.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
      })),
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve staff members", error });
    return;
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  try {
    await dbConn();

    const employeeId = req.params.id;

    if (!employeeId) {
      res.status(400).json({ success: false, message: "Staff ID is required" });
      return;
    }
    if (typeof employeeId !== "string" || employeeId.trim() === "") {
      res.status(400).json({ success: false, message: "Invalid staff ID" });
      return;
    }

    const staff = await Staff.findOne({ employee_id: employeeId });
    if (!staff) {
      res
        .status(404)
        .json({ success: false, message: "Staff member not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Fetched Staff Details",
      staff,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve staff member", error });
    return;
  }
};
