import { dbConn } from "../config/dbconfig";
import Asset from "../models/asset.model";
import { Request, Response } from "express";
import mongoose from "mongoose";
// //get all assets

export const getAssets = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    await dbConn();
    const assets = await Asset.find().lean().populate({
      path: "custodian",
      select: " firstname lastname",
    });

    const assetData = assets.map((assets: any) => ({
      ...assets,
      createdAt: assets.createdAt!.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    }));

    res.status(200).json({
      success: true,
      message: "Successfully fetched data",
      assets: assetData,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to get data",
    });
    return;
  }
};

// // add new asset
export const addNewAsset = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Invalid ID" });
    return;
  }

  if (!data) {
    res.status(400).json({ success: false, message: "No data provided" });
    return;
  }
  const newData = new Asset({ ...data, custodian: userId });

  try {
    await dbConn();
    await newData.save();

    res
      .status(200)
      .json({ success: true, message: "New Asset Record Created" });
    return;
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
    return;
  }
};

// //edit asset customer
export const updateAsset = async (req: Request, res: Response) => {
  const id = req.user!.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid ID" });
    return;
  }

  try {
    const data = req.body;

    await dbConn();
    const newData = await Asset.findByIdAndUpdate(id, data, { new: true });

    res
      .status(200)
      .json({ success: true, message: "Assets data updated", data: data });
    return;
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
    return;
  }
};

// // delete one customer
export const deleteAsset = async (req: Request, res: Response) => {
  const { id } = req.user!;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid ID" });
    return;
  }

  try {
    const deleteData = await Asset.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Asset deleted", data: deleteData });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Unable to get data",
      error: error.message,
    });
    return;
  }
};
