import { dbConn } from "../config/dbconfig";
import { Request, Response } from "express";
import Exit, { Exits } from "../models/exit.models";
import { changeDate, firstDay, lastDay } from "../utils/helpers";
import Asset from "../models/asset.model";
import Movement from "../models/movement.model";
import Others from "../models/others.model";
import Repairs from "../models/repairs.model";

export const getExitsReport = async (req: Request, res: Response) => {
  const { from, to, byMonth } = req.body;

  try {
    await dbConn();

    const startDate = byMonth
      ? firstDay(new Date(from))
      : new Date(from).setHours(0, 0, 0, 0);

    const endDate = byMonth
      ? lastDay(new Date(to))
      : new Date(to).setHours(23, 59, 59, 999);

    const exits = await Exit.find(
      { createdAt: { $gte: startDate, $lte: endDate } },
      {
        __v: 0,
        createdAt: 0,
        _id: 0,
        updatedAt: 0,
        lastEditedBy: 0,
        createdBy: 0,
      }
    ).lean();

    const exit = exits.map((e: Exits) => ({
      ...e,
      retrieval_Date: changeDate(e.retrieval_Date),
      date_Of_Exit: changeDate(e.date_Of_Exit),
    }));

    res
      .status(200)
      .json({
        success: true,
        message: "Generated Exit Register Report",
        report: exit,
      });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const getMovementsReport = async (req: Request, res: Response) => {
  const { from, to, byMonth } = req.body;

  try {
    await dbConn();

    const startDate = byMonth
      ? firstDay(new Date(from))
      : new Date(from).setHours(0, 0, 0, 0);

    const endDate = byMonth
      ? lastDay(new Date(to))
      : new Date(to).setHours(23, 59, 59, 999);

    // Replace with your actual Movement model
    const movements = await Movement.find(
      { createdAt: { $gte: startDate, $lte: endDate } },
      {
        __v: 0,
        createdAt: 0,
        _id: 0,
        updatedAt: 0,
        lastEditedBy: 0,
        createdBy: 0,
      }
    ).lean();

    res.status(200).json({
      success: true,
      message: "Generated Movements Report",
      report: movements,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const getAssetsReport = async (req: Request, res: Response) => {
  const { from, to, byMonth } = req.body;

  try {
    await dbConn();

    const startDate = byMonth
      ? firstDay(new Date(from))
      : new Date(from).setHours(0, 0, 0, 0);

    const endDate = byMonth
      ? lastDay(new Date(to))
      : new Date(to).setHours(23, 59, 59, 999);

    // Replace with your actual Asset model
    const assets = await Asset.find(
      { createdAt: { $gte: startDate, $lte: endDate } },
      {
        __v: 0,
        createdAt: 0,
        _id: 0,
        updatedAt: 0,
        lastEditedBy: 0,
        createdBy: 0,
      }
    ).lean();

    res.status(200).json({
      success: true,
      message: "Gererated Laptops Report",
      report: assets,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const getOthersAssetsReport = async (req: Request, res: Response) => {
  const { from, to, byMonth } = req.body;

  try {
    await dbConn();

    const startDate = byMonth
      ? firstDay(new Date(from))
      : new Date(from).setHours(0, 0, 0, 0);

    const endDate = byMonth
      ? lastDay(new Date(to))
      : new Date(to).setHours(23, 59, 59, 999);

    // Replace with your actual OthersAsset model
    const othersAssets = await Others.find(
      { createdAt: { $gte: startDate, $lte: endDate } },
      {
        __v: 0,
        createdAt: 0,
        _id: 0,
        updatedAt: 0,
        lastEditedBy: 0,
        createdBy: 0,
      }
    ).lean();

    res.status(200).json({
      success: true,
      message: "Generated Others Report",
      report: othersAssets,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const getRepairsReport = async (req: Request, res: Response) => {
  const { from, to, byMonth } = req.body;

  try {
    await dbConn();

    const startDate = byMonth
      ? firstDay(new Date(from))
      : new Date(from).setHours(0, 0, 0, 0);

    const endDate = byMonth
      ? lastDay(new Date(to))
      : new Date(to).setHours(23, 59, 59, 999);

    // Replace with your actual Repair model
    const repairs = await Repairs.find(
      { createdAt: { $gte: startDate, $lte: endDate } },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        lastEditedBy: 0,
        createdBy: 0,
      }
    ).lean();

    res.status(200).json({
      success: true,
      message: "Generated Repairs Report",
      report: repairs,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};
