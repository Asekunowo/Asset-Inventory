import {Request, Response} from "express";
import mongoose from "mongoose";
import {dbConn} from "../config/dbconfig";
import Asset from "../models/asset.model";
import {IAsset} from "../types/modeltypes";
// //get all assets

export const getAssets = async (req: Request, res: Response) => {
	const userId = req.user!.id;

	try {
		await dbConn();
		const assets = await Asset.find()
			.lean()
			.populate([
				{path: "createdBy", select: "firstname lastname email"},
				{path: "lastEditedBy", select: "firstname lastname email"},
			]);

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
	const data: IAsset = req.body;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		res.status(400).json({success: false, message: "Invalid ID"});
		return;
	}

	if (!data) {
		res.status(400).json({success: false, message: "No data provided"});
		return;
	}

	const newData = new Asset<IAsset>({
		...data,
		lastEditedBy: userId,
		createdBy: userId,
	});

	try {
		await dbConn();

		const existingAsset = await Asset.findOne({tag: data.tag});
		if (existingAsset) {
			res.status(409).json({
				success: false,
				message: "Asset with this tag already exists",
			});
			return;
		}
		const existingSerial = await Asset.findOne({
			serial_no: data.serial_no,
		});
		if (existingSerial) {
			res.status(409).json({
				success: false,
				message: "Asset with this serial number already exists",
			});
			return;
		}

		await newData.save();

		const newAsset = await Asset.findOne({
			serial_no: newData.serial_no,
		}).populate([
			{path: "createdBy", select: "firstname lastname email"},
			{path: "lastEditedBy", select: "firstname lastname email"},
		]);

		res.status(200).json({
			success: true,
			message: "New Asset Record Created",
			asset: newAsset,
		});
		return;
	} catch (err: any) {
		console.log(err);
		res.status(500).json({success: false, message: err.message});
		return;
	}
};

// //edit asset customer
export const updateAsset = async (req: Request, res: Response) => {
	const assetId = req.params.id;
	const userId = req.user!.id;
	const updateData = req.body;

	if (!mongoose.Types.ObjectId.isValid(assetId)) {
		res.status(400).json({success: false, message: "Invalid asset ID"});
		return;
	}

	try {
		await dbConn();
		const updatedAsset = await Asset.findByIdAndUpdate(assetId, {...updateData, lastEditedBy: userId}, {new: true})
			.lean()
			.populate([
				{path: "createdBy", select: "firstname lastname email"},
				{path: "lastEditedBy", select: "firstname lastname email"},
			]);

		if (!updatedAsset) {
			res.status(404).json({success: false, message: "Asset not found"});
			return;
		}

		res.status(200).json({
			success: true,
			message: "Asset updated successfully",
			asset: updatedAsset,
		});
		return;
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "Unable to update asset",
			error: error.message,
		});
		return;
	}
};

// // delete one customer
export const deleteAsset = async (req: Request, res: Response) => {
	const {id} = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({success: false, message: "Invalid ID"});
		return;
	}

	try {
		await dbConn();

		const deleteData = await Asset.findByIdAndDelete(id);
		res.status(200).json({success: true, message: "Asset deleted", asset: deleteData});

		if (!deleteData) {
			res.status(404).json({success: false, message: "Asset not found."});
			return;
		}
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

export const addMultipleAssets = async (req: Request, res: Response) => {
	const userId = req.user!.id;
	const assets: IAsset[] = req.body;

	console.log(assets);

	// return;

	if (!Array.isArray(assets) || assets.length === 0) {
		res.status(400).json({success: false, message: "No assets provided"});
		return;
	}

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		res.status(400).json({success: false, message: "Invalid user ID"});
		return;
	}

	try {
		await dbConn();

		// Check for duplicate tags or serial numbers in DB
		const tags = assets.map((a) => a.tag);
		const serials = assets.map((a) => a.serial_no);

		const existingAssets = await Asset.find({
			$or: [{tag: {$in: tags}}, {serial_no: {$in: serials}}],
		}).lean();

		if (existingAssets.length > 0) {
			res.status(409).json({
				success: false,
				message: "Some assets with provided tags or serial numbers already exist",
				duplicates: existingAssets,
			});
			return;
		}

		// Add user info to each asset
		const assetsToInsert = assets.map((asset) => ({
			...asset,
			createdBy: userId,
			lastEditedBy: userId,
		}));

		const insertedAssets = await Asset.insertMany(assetsToInsert);

		// Populate createdBy and lastEditedBy fields
		const populatedAssets = await Asset.find({
			_id: {$in: insertedAssets.map((a) => a._id)},
		}).populate([
			{path: "createdBy", select: "firstname lastname email"},
			{path: "lastEditedBy", select: "firstname lastname email"},
		]);

		res.status(201).json({
			success: true,
			message: "Assets added successfully",
			assets: populatedAssets,
		});
		return;
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: "Unable to create assets",
			error: error.message,
		});
		return;
	}
};
