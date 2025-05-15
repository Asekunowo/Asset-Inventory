import { Request, Response } from "express";

// Example Exit type/interface
import Exit, { Exits } from "../models/exit.models";
import { dbConn } from "../config/dbconfig";
import Staff from "../models/staff.model";

interface AddExitRequest extends Request {
  body: Exits;
}

export const addExit = async (req: AddExitRequest, res: Response) => {
  console.log(req.body);

  try {
    await dbConn();

    const { staffId } = req.body;

    const staffExists = await Staff.findOne({ staffId: staffId });

    if (!staffExists) {
      res.status(404).json({ success: false, message: "User does not exit" });
      return;
    }

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
    });

    await newExit.save();

    const exit: any = await Exit.findOne({ staffId: req.body.staffId }).lean();

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
    const exits: any = await Exit.find().lean();

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
