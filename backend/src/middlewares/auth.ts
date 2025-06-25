import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload, verify} from "jsonwebtoken";
import {SECRET_KEY} from "../secrets";
const {TokenExpiredError, JsonWebTokenError} = jwt;

type Users = {
	id: string;
	email: string;
	isAdmin: boolean;
};

declare module "express" {
	export interface Request {
		user?: Pick<Users, "id" | "email"> | JwtPayload;
	}
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.authToken;

		if (!token) {
			res.status(401).json({success: false, message: "No token provided. Please Login"});
			return;
		}

		const accessToken = token;

		const user = verify(accessToken, SECRET_KEY) as Users;
		req.user = user;
		next();
		return;
	} catch (err) {
		if (err instanceof TokenExpiredError) {
			res.status(401).json({message: "Token expired. Please Login Again"});
			return;
		}
		if (err instanceof JsonWebTokenError) {
			res.status(403).json({message: "Invalid token"});
			return;
		}
		res.status(500).json({message: "Failed to authenticate token"});
		return;
	}
};
