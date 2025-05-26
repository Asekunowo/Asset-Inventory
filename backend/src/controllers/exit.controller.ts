import { Request, Response } from "express";

// Example Exit type/interface
import Exit, { Exits } from "../models/exit.models";
import { dbConn } from "../config/dbconfig";
import mongoose from "mongoose";

interface AddExitRequest extends Request {
  body: Exits;
}

export const addExit = async (req: AddExitRequest, res: Response) => {
  const userId = req.user!.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
    return;
  }

  try {
    await dbConn();

    const tagExists = await Exit.findOne({ tag: req.body.tag });
    if (tagExists) {
      res.status(409).json({
        success: false,
        message: "An entry with this tag already exists.",
      });
      return;
    }

    const serialExists = await Exit.findOne({
      serial_no: req.body.serial_no,
    });
    if (serialExists) {
      res.status(409).json({
        success: false,
        message: "An entry with this serial number already exists.",
      });
      return;
    }

    const exitdata = req.body;
    const newExit = new Exit({
      ...exitdata,
      date_Of_Exit: new Date(req.body.date_Of_Exit),
      retrieval_Date: new Date(req.body.retrieval_Date),
      createdBy: userId,
      lastEditedBy: userId,
    });

    await newExit.save();

    const exit: any = await Exit.findOne(
      { employee_id: req.body.employee_id },
      { __v: 0, updatedAt: 0 }
    )
      .lean()
      .populate([
        { path: "createdBy", select: "firstname lastname email" },
        { path: "lastEditedBy", select: "firstname lastname email" },
      ]);

    if (!exit) {
      res.status(400).json({ success: false, message: "An error occured" });
      return;
    }

    const exitData = {
      ...exit,
      retrieval_Date: exit.retrieval_Date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      date_Of_Exit: exit.date_Of_Exit.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      createdAt: exit.createdAt!.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    };

    res.status(201).json({
      success: true,
      message: "Exit added successfully.",
      exit: exitData,
    });
    return;
  } catch (error: any) {
    console.error(error);

    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    return;
  }
};

export const getExits = async (req: Request, res: Response) => {
  try {
    await dbConn();
    const exits: any = await Exit.find({}, { __v: 0, updatedAt: 0 })
      .lean()
      .populate([
        { path: "createdBy", select: "firstname lastname email" },
        { path: "lastEditedBy", select: "firstname lastname email" },
      ]);

    const exitData = exits.map((exit: any) => ({
      ...exit,
      retrieval_Date: exit.retrieval_Date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      date_Of_Exit: exit.date_Of_Exit.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      createdAt: exit.createdAt!.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    }));

    res.status(200).json({ success: true, exits: exitData });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    return;
  }
};

export const updateExit = async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ success: false, message: "Invalid exit ID." });
    return;
  }

  const userId = req.user!.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
    return;
  }

  try {
    await dbConn();

    const { id } = req.params;
    const updateData = { ...req.body, lastEditedBy: userId };

    // Convert date fields if present
    if (updateData.date_Of_Exit) {
      updateData.date_Of_Exit = new Date(updateData.date_Of_Exit);
    }
    if (updateData.retrieval_Date) {
      updateData.retrieval_Date = new Date(updateData.retrieval_Date);
    }

    const updatedExit = await Exit.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .lean()
      .populate({ path: "lastEditedBy", select: "firstname lastname email" });

    if (!updatedExit) {
      res.status(404).json({ success: false, message: "Exit not found." });
      return;
    }

    const exitData = {
      ...updatedExit,
      retrieval_Date: updatedExit.retrieval_Date
        ? updatedExit.retrieval_Date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
        : null,
      date_Of_Exit: updatedExit.date_Of_Exit
        ? updatedExit.date_Of_Exit.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
        : null,
      createdAt: updatedExit.createdAt
        ? updatedExit.createdAt.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
        : null,
    };

    res.status(200).json({
      success: true,
      message: "Exit updated successfully.",
      exit: exitData,
    });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    return;
  }
};

export const deleteExit = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid exit ID." });
    return;
  }

  try {
    await dbConn();

    const deletedExit = await Exit.findByIdAndDelete(id);

    if (!deletedExit) {
      res.status(404).json({ success: false, message: "Exit not found." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Exit deleted successfully.",
    });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    return;
  }
};
