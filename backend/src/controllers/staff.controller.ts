import { Request, Response } from "express";
import Staff from "../models/staff.model";
import { dbConn } from "../config/dbconfig";

// POST /api/staff - Add new staff member
export const addStaff = async (req: Request, res: Response) => {
  try {
    await dbConn();

    const requiredFields = [
      "staffId",
      "name",
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
          message: `Field '${field}' is required and must be a non-empty string`,
        });
        return;
      }
    }

    const isExists = await Staff.findOne({ staffId: req.body.staffId });

    if (isExists) {
      res
        .status(400)
        .json({ success: false, message: "Staff with this id already exists" });
      return;
    }

    const staffData = req.body;
    const newStaff = new Staff(staffData);
    await newStaff.save();
    res
      .status(201)
      .json({ message: "Staff member added successfully", staff: newStaff });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to add staff member", error });
    return;
  }
};

export const getStaff = async (req: Request, res: Response) => {
  try {
    await dbConn();

    const staffList: any = await Staff.find().lean();

    res.status(200).json({
      success: true,
      message: "Fetchb Staff Details",
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

    const staffId = req.params.id;

    if (!staffId) {
      res.status(400).json({ message: "Staff ID is required" });
      return;
    }
    if (typeof staffId !== "string" || staffId.trim() === "") {
      res.status(400).json({ message: "Invalid staff ID" });
      return;
    }

    const staff = await Staff.findOne({ staffId: staffId });
    if (!staff) {
      res.status(404).json({ message: "Staff member not found" });
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
