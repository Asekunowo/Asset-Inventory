import { default as mongoose } from "mongoose";
import { Request, Response } from "express";
import { dbConn } from "../config/dbconfig";
import { hashSync, compare } from "bcrypt";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }

  try {
    await dbConn();
    const user = await User.find();
    res.status(200).json({ success: true, message: "Users fetched", user });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch data" });
    return;
  }
};

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;

  const newUser = new User({ ...user, password: hashSync(user.password, 10) });

  try {
    await dbConn();

    const isUserExists = await User.findOne({ email: req.body.email });

    if (isUserExists) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created",
      newUser,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to create user" });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid id" });
    return;
  }

  try {
    await dbConn();
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "No user with this id exists" });
      return;
    }

    res.status(200).json({ success: true, message: "User found", user });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "User not found" });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid id" });
    return;
  }

  try {
    await dbConn();

    const isUserExists = await User.findByIdAndDelete(id);
    if (!isUserExists) {
      res
        .status(404)
        .json({ success: false, message: "No user with this id exists" });
      return;
    }

    res.status(200).json({ success: true, message: "User deleted!" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to delete user" });
    return;
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const { oldPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }

  try {
    await dbConn();
    const checkPassword = await User.findById(userId);

    if (!compare(oldPassword, checkPassword.password)) {
      res
        .status(401)
        .json({ success: false, message: "Old password incorrect" });
      return;
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $set: { password: hashSync(newPassword, 10) },
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Password changed!" });
    return;
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to change password" });
    return;
  }
};
