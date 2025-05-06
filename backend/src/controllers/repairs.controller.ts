import { Request, Response } from "express";
import Repairs from "../models/repairs.model";
import { dbConn } from "../config/dbconfig";
import { Types } from "mongoose";

export const getRepairs = async (req: Request, res: Response) => {
  try {
    await dbConn();

    const repairs = await Repairs.find().populate({
      path: "custodian",
      select: "firstname lastname email",
    });
    res.status(200).json({
      success: true,
      message: "Successfully fetched repairs",
      repairs,
    });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to get repairs" });
    return;
  }
};

export const addNewRepairs = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }
  const data = req.body;

  if (!data) {
    res.status(400).json({ success: false, message: "No data provided" });
    return;
  }
  const newData = new Repairs({ ...data, custodian: userId });

  try {
    await dbConn();
    await newData.save();

    res
      .status(200)
      .json({ success: true, message: "New Repair Record Created" });
    return;
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
    return;
  }
};
