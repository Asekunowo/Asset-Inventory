import { Types } from "mongoose";
import { dbConn } from "../config/dbconfig";
import { Request, Response } from "express";
import User from "../models/user.model";
import Movement from "../models/movement.model";

interface MovementRequest extends Request {
  body: {
    type: string;
    tag: string;
    serial_no: string;
    from_location: string;
    to_location: string;
    recipient: string;
    reason: string;
  };
}

export const getMovements = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(403).json({
      success: false,
      message: "Not Authorized",
    });
    return;
  }

  try {
    await dbConn();

    const userExists = await User.findOne({ _id: userId });

    if (!userExists) {
      res.status(404).json({
        success: false,
        message: "You do not have access to this resource",
      });
      return;
    }

    const movements = await Movement.find().populate({
      path: "custodian",
      select: "firstname lastname",
    });
    res
      .status(200)
      .json({ success: true, message: "Fetched Exits", movements });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const addExit = async (req: MovementRequest, res: Response) => {
  const userId = req.user!.id;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(403).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
    return;
  }

  const {
    type,
    tag,
    serial_no,
    from_location,
    to_location,
    recipient,
    reason,
  } = req.body;

  if (
    !type ||
    !tag ||
    !serial_no ||
    !from_location ||
    !to_location ||
    !recipient ||
    !reason
  ) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
    return;
  }

  try {
    await dbConn();

    const newMovement = new Movement({ ...req.body, custodian: userId });

    await newMovement.save();

    const data = await Movement.findById({ _id: newMovement._id }).populate({
      path: "custodian",
      select: "firstname lastname",
    });

    res.status(201).json({
      success: true,
      message: "Movement record created successfully",
      movement: data,
    });
    return;
  } catch (error) {
    console.error("Error creating movement record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create movement record",
    });
    return;
  }
};
