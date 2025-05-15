import { dbConn } from "../config/dbconfig";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../secrets";
import { compare } from "bcrypt";
import { default as mongoose } from "mongoose";
import { Request, Response } from "express";
import User from "../models/user.model";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await dbConn();

    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }

    if (!compare(password, userExists.password)) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    const user = await User.findOne({ email }).select(
      "firstname lastname email role"
    );

    const token = sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "3h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // Or 'lax', depending on your needs,
      maxAge: 2 * 60 * 60 * 1000, // 1 hour (in milliseconds)
    });

    res.status(200).json({ success: true, message: "Welcome Back", user });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await dbConn();

    res.clearCookie("authToken");
    res.status(200).json({ success: true, message: "Logged out" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};
