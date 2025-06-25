import {compare, hashSync} from "bcrypt";
import {Request, Response} from "express";
import {default as mongoose} from "mongoose";
import {dbConn} from "../config/dbconfig";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
	const userId = req.user!.id;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		res.status(400).json({success: false, message: "Not Authorized"});
		return;
	}

	try {
		await dbConn();
		const user = await User.find();
		res.status(200).json({success: true, message: "Users fetched", user});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "Could not fetch data"});
		return;
	}
};

export const createUser = async (req: Request, res: Response) => {
	const user = req.body;

	const newUser = new User({...user, password: hashSync(user.password, 10)});

	try {
		await dbConn();

		const isUserExists = await User.findOne({email: req.body.email});

		if (isUserExists) {
			res.status(400).json({
				success: false,
				message: "User with this email already exists",
			});
			return;
		}

		await newUser.save();

		const userObj = newUser.toObject();
		delete userObj.password;
		delete userObj.__v;

		res.status(201).json({
			success: true,
			message: "User created",
			newUser: userObj,
		});
		return;
	} catch (error) {
		console.log(error);
		res.status(500).json({success: false, message: "Unable to create user", error});
	}
};

export const getOneUser = async (req: Request, res: Response) => {
	const {id} = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({success: false, message: "Invalid id"});
		return;
	}

	try {
		await dbConn();
		const user = await User.findById(id);
		console.log(user);
		if (!user) {
			res.status(404).json({success: false, message: "No user with this id exists"});
			return;
		}

		res.status(200).json({success: true, message: "User found", user});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "User not found", error});
		return;
	}
};

export const changePassword = async (req: Request, res: Response) => {
	const userId = req.user!.id;

	const {oldPassword, newPassword} = req.body;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		res.status(400).json({success: false, message: "Not Authorized"});
		return;
	}

	try {
		await dbConn();
		const checkPassword = await User.findById(userId);

		if (!compare(oldPassword, checkPassword.password)) {
			res.status(401).json({success: false, message: "Old password incorrect"});
			return;
		}

		await User.findByIdAndUpdate(
			userId,
			{
				$set: {password: hashSync(newPassword, 10)},
			},
			{new: true},
		);

		res.status(200).json({success: true, message: "Password changed!"});
		return;
	} catch (error: any) {
		res.status(500).json({success: false, message: "Unable to change password", error});
		return;
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const userId = req.user!.id;

	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({success: false, message: "Invalid user id"});
		return;
	}

	try {
		await dbConn();

		const isAdmin = await User.findById(userId);

		if (!isAdmin || !isAdmin.isAdmin) {
			res.status(403).json({success: false, message: "You cannot perform this action!"});
			return;
		}
		const updates = {...req.body};
		// Prevent password update here
		delete updates.password;

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{$set: updates},
			{
				new: true,
				projection: {
					__v: 0,
					updatedAt: 0,
				},
			},
		);

		if (!updatedUser) {
			res.status(404).json({success: false, message: "User not found"});
			return;
		}

		res.status(200).json({success: true, message: "User updated", user: updatedUser});
		return;
	} catch (error: any) {
		res.status(500).json({success: false, message: "Unable to update user", error});
		return;
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const userId = req.user!.id;

	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({success: false, message: "Invalid user id"});
		return;
	}

	try {
		await dbConn();

		const isAdmin = await User.findById(userId);

		if (!isAdmin || !isAdmin.isAdmin) {
			res.status(403).json({success: false, message: "You cannot perform this action!"});
			return;
		}

		const deletedUser = await User.findByIdAndDelete(req.params.id);

		if (!deletedUser) {
			res.status(404).json({success: false, message: "User not found"});
			return;
		}

		res.status(200).json({success: true, message: "User deleted"});
		return;
	} catch (error: any) {
		res.status(500).json({success: false, message: "Unable to delete user", error});
		return;
	}
};
