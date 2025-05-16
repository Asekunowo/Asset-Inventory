import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import { error } from "console";

export const loginLimit = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000, //1 hour
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: "Login Limit Exceeded",
      message: "Too many login attempts. Please try again later...",
    });
  },
});

export const passwordChangeLimit = rateLimit({
  max: 1,
  windowMs: 60 * 60 * 1000 * 24,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: "Password Change Limit Exceeded",
      message:
        "You cannot change your password at this time. Please try again later...",
    });
  },
});
