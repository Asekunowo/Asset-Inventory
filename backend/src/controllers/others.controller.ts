import { Request, Response } from "express";
import Others from "../models/others.model";
import mongoose, { Types } from "mongoose";
import { dbConn } from "../config/dbconfig";
import User from "../models/user.model";

interface OtherRequest extends Request {
  type?: string;
  tag?: string;
  serial_no?: string;
  model?: string;
  branch?: string;
}

export const addNewOther = async (req: OtherRequest, res: Response) => {
  const userId = req.user!.id;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(401).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
    return;
  }

  const { type, tag, serial_no, model, branch } = req.body;

  const newData = new Others({ ...req.body, custodian: userId });
  try {
    await dbConn();

    const custodian = await User.findById(userId);

    if (!custodian) {
      res.status(404).json({
        success: false,
        message: "Custodian not found",
      });
      return;
    }

    const existingAsset_tag = await Others.findOne({ tag });

    if (existingAsset_tag) {
      res.status(404).json({
        success: false,
        message: "Asset with this tag already exists.",
      });
      return;
    }

    const existingAsset_serial = await Others.findOne({ serial_no });

    if (existingAsset_serial) {
      res.status(404).json({
        success: false,
        message: "Asset with this serial number already exists.",
      });
      return;
    }

    await newData.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully added new other asset" });
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const getOtherAssets = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(404).json({ success: false, message: "Invalid User Id" });
    return;
  }

  try {
    await dbConn();

    const isUserExists = await User.findOne({ _id: userId });

    if (!isUserExists) {
      res.status(403).json({
        success: false,
        message: "You don't have access to view this record",
      });
      return;
    }

    const others = await Others.find().populate({
      path: "custodian",
      select: "firstname lastname",
    });

    res.status(200).json({
      success: true,
      message: "Successfully fetched other assets",
      others,
    });
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};
