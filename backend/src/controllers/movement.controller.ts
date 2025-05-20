import { Types } from "mongoose";
import { dbConn } from "../config/dbconfig";
import { Request, Response } from "express";

import Movement from "../models/movement.model";
import { IMovement } from "../types/modeltypes";

export const getMovements = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    await dbConn();

    const movements = await Movement.find({
      createdAt: { $gte: start, $lte: end },
    }).populate([
      {
        path: "createdBy",
        select: "firstname lastname",
      },
      {
        path: "lastEditedBy",
        select: "firstname lastname",
      },
    ]);
    res
      .status(200)
      .json({ success: true, message: "Fetched Movements", movements });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const addMovement = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const newMovmeentData = req.body;

  try {
    await dbConn();

    const newMovement = new Movement<IMovement>({
      ...newMovmeentData,
      createdBy: userId,
      lastEditedBy: userId,
    });

    await newMovement.save();

    const data = await Movement.findById({ _id: newMovement._id }).populate([
      {
        path: "createdBy",
        select: "firstname lastname",
      },
      {
        path: "lastEditedBy",
        select: "firstname lastname",
      },
    ]);

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

export const updateMovement = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const newMovement = req.body;

  if (!Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid movement ID" });
    return;
  }

  if (!newMovement.tag) {
    res.status(400).json({ success: false, message: "No data found" });
    return;
  }

  try {
    await dbConn();

    const updatedMovement = await Movement.findByIdAndUpdate(
      id,
      {
        ...newMovement,
        lastEditedBy: userId,
      },
      { new: true }
    ).populate([
      {
        path: "createdBy",
        select: "firstname lastname",
      },
      {
        path: "lastEditedBy",
        select: "firstname lastname",
      },
    ]);

    if (!updatedMovement) {
      res.status(404).json({ success: false, message: "Movement not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Movement updated successfully",
      movement: updatedMovement,
    });
    return;
  } catch (error) {
    console.error("Error updating movement record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update movement record",
    });
    return;
  }
};
