import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

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
