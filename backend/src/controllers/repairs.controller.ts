import {Request, Response} from "express";
import {Types} from "mongoose";
import {dbConn} from "../config/dbconfig";
import Repairs from "../models/repairs.model";
import {changeDate} from "../utils/helpers";

export const getRepairs = async (req: Request, res: Response) => {
	try {
		await dbConn();

		const repairs = await Repairs.find({}, {__v: 0, updatedAt: 0})
			.lean()
			.populate([
				{
					path: "createdBy",
					select: "firstname lastname email",
				},
				{
					path: "lastEditedBy",
					select: "firstname lastname email",
				},
			]);

		const repairData = repairs.map((repair: any) => ({
			...repair,
			createdAt: changeDate(repair.createdAt),
		}));

		res.status(200).json({
			success: true,
			message: "Successfully fetched repairs",
			repairs: repairData,
		});
		return;
	} catch (error: any) {
		console.log(error);
		res.status(500).json({success: false, message: "Unable to get repairs"});
		return;
	}
};

export const addNewRepairs = async (req: Request, res: Response) => {
	const userId = req.user!.id;

	const data = req.body;

	if (!data) {
		res.status(400).json({success: false, message: "No data provided"});
		return;
	}

	try {
		await dbConn();

		const newData = new Repairs({
			...data,
			createdBy: userId,
			lastEditedBy: userId,
		});

		const existingTag = await Repairs.findOne({tag: data.tag});
		if (existingTag) {
			res.status(400).json({
				success: false,
				message: "A record with this tag already exists",
			});
			return;
		}

		const existingSerial = await Repairs.findOne({
			serial_no: data.serial_no,
		});
		if (existingSerial) {
			res.status(400).json({
				success: false,
				message: "A record with this serial number already exists",
			});
			return;
		}

		await newData.save();

		const newRepair: any = await Repairs.findOne({_id: newData._id}, {__v: 0, updatedAt: 0})
			.lean()
			.populate([
				{path: "createdBy", select: "firstname lastname email"},
				{path: "lastEditedBy", select: "firstname lastname email"},
			]);

		res.status(200).json({
			success: true,
			message: "New Repair Record Created",
			repair: {
				...newRepair,
				createdAt: changeDate(newRepair.createdAt),
			},
		});
		return;
	} catch (err: any) {
		res.status(500).json({success: false, message: err.message});
		return;
	}
};

export const updateRepair = async (req: Request, res: Response) => {
	const userId = req.user!.id;
	const {id} = req.params;
	const updateData = req.body;

	if (!Types.ObjectId.isValid(id)) {
		res.status(400).json({success: false, message: "Invalid repair ID"});
		return;
	}

	try {
		await dbConn();

		const repair = await Repairs.findById(id);
		if (!repair) {
			res.status(404).json({success: false, message: "Repair not found"});
			return;
		}

		updateData.lastEditedBy = userId;

		const updatedRepair: any = await Repairs.findByIdAndUpdate(
			id,
			{$set: updateData},
			{
				new: true,
				projection: {
					__v: 0,
					updatedAt: 0,
				},
			},
		)
			.lean()
			.populate([
				{path: "createdBy", select: "firstname lastname email"},
				{path: "lastEditedBy", select: "firstname lastname email"},
			]);

		if (!updatedRepair) {
			res.status(404).json({success: false, message: "Repair not found after update"});
			return;
		}

		res.status(200).json({
			success: true,
			message: "Repair updated successfully",
			repair: {
				...updatedRepair,
				createdAt: changeDate(updatedRepair.createdAt),
			},
		});
		return;
	} catch (error: any) {
		res.status(500).json({success: false, message: error.message});
		return;
	}
};

export const deleteRepair = async (req: Request, res: Response) => {
	const {id} = req.params;

	if (!Types.ObjectId.isValid(id)) {
		res.status(400).json({success: false, message: "Invalid repair ID"});
		return;
	}

	try {
		await dbConn();

		const deletedRepair = await Repairs.findByIdAndDelete(id);

		if (!deletedRepair) {
			res.status(404).json({success: false, message: "Repair not found"});
			return;
		}

		res.status(200).json({
			success: true,
			message: "Repair deleted successfully",
			repair: deletedRepair,
		});
		return;
	} catch (error: any) {
		res.status(500).json({success: false, message: error.message});
		return;
	}
};
