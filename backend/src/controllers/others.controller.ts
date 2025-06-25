import {Request, Response} from "express";
import mongoose from "mongoose";
import {dbConn} from "../config/dbconfig";
import Others from "../models/others.model";
import {IOther} from "../types/modeltypes";
import {changeDate} from "../utils/helpers";

interface OtherRequest extends Request {
	type?: string;
	tag?: string;
	serial_no?: string;
	model?: string;
	branch?: string;
	createdAt?: string;
}

export const addNewOther = async (req: OtherRequest, res: Response) => {
	const userId = req.user!.id;

	const {tag, serial_no} = req.body;

	const newData = new Others<IOther>({
		...req.body,
		createdBy: userId,
		lastEditedBy: userId,
	});

	try {
		await dbConn();

		const existingAsset_tag = await Others.findOne({tag});

		if (existingAsset_tag) {
			res.status(404).json({
				success: false,
				message: "Asset with this tag already exists.",
			});
			return;
		}

		const existingAsset_serial = await Others.findOne({serial_no});

		if (existingAsset_serial) {
			res.status(404).json({
				success: false,
				message: "Asset with this serial number already exists.",
			});
			return;
		}

		await newData.save();

		const newOther: any = await Others.findOne({tag})
			.lean()
			.populate([
				{path: "createdBy", select: "firstname lastname email"},
				{path: "lastEditedBy", select: "firstname lastname email"},
			]);

		res.status(200).json({
			success: true,
			message: "Successfully added new other asset",
			other: {...newOther, createdAt: changeDate(newOther.createdAt)},
		});
		return;
	} catch (error: any) {
		console.error(error);
		res.status(500).json({success: false, message: "Server Error"});
		return;
	}
};

export const getOtherAssets = async (req: Request, res: Response) => {
	try {
		await dbConn();

		const others = await Others.find()
			.lean()
			.populate([
				{path: "createdBy", select: "firstname lastname email"},
				{path: "lastEditedBy", select: "firstname lastname email"},
			]);

		const othersData = others.map((other) => ({
			...other,
			createdAt: changeDate(other.createdAt),
		}));

		res.status(200).json({
			success: true,
			message: "Successfully fetched other assets",
			others: othersData,
		});
		return;
	} catch (error: any) {
		console.error(error);
		res.status(500).json({success: false, message: "Server Error"});
		return;
	}
};

export const updateOtherAsset = async (req: Request, res: Response) => {
	const {id} = req.params;
	const userId = req.user?.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({success: false, message: "Invalid other asset ID"});
		return;
	}

	try {
		await dbConn();

		const updateData = {
			...req.body,
			lastEditedBy: userId,
		};

		if (!updateData.tag) {
			res.status(400).json({success: false, message: "No data provided"});
			return;
		}

		const updatedOther: any = await Others.findByIdAndUpdate(id, updateData, {
			new: true,
			projection: {
				__v: 0,
				updatedAt: 0,
			},
		})
			.lean()
			.populate([
				{path: "createdBy", select: "firstname lastname email"},
				{path: "lastEditedBy", select: "firstname lastname email"},
			]);

		if (!updatedOther) {
			res.status(404).json({success: false, message: "Other Asset not found"});
			return;
		}

		res.status(200).json({
			success: true,
			message: "Successfully updated other asset",
			other: {...updatedOther, createdAt: changeDate(updatedOther.createdAt)},
		});
		return;
	} catch (error: any) {
		console.error(error);
		res.status(500).json({success: false, message: "Server Error"});
		return;
	}
};

export const deleteOtherAsset = async (req: Request, res: Response) => {
	const {id} = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({success: false, message: "Invalid other asset ID"});
		return;
	}

	try {
		await dbConn();

		const deletedOther = await Others.findByIdAndDelete(id);

		if (!deletedOther) {
			res.status(404).json({success: false, message: "Other Asset not found"});
			return;
		}

		res.status(200).json({
			success: true,
			message: "Successfully deleted other asset",
		});
		return;
	} catch (error: any) {
		console.error(error);
		res.status(500).json({success: false, message: "Server Error"});
		return;
	}
};
