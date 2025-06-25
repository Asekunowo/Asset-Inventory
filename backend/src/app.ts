import cookieParser from "cookie-parser";
import cors from "cors";
import express, {Express} from "express";
import morgan from "morgan";
import appRouter from "./routes/root.route";
import {FRONTEND_URL, NODE_ENV} from "./secrets";

const createApp = () => {
	const app: Express = express();

	app.use(express.json());
	app.use(cookieParser());
	app.use(express.urlencoded({extended: true}));

	app.use(
		cors({
			origin: FRONTEND_URL,
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
		}),
	);

	if (NODE_ENV === "development") {
		app.use(morgan("dev"));
	}

	app.get("/health", (req, res) => {
		res.status(200).json({status: "ok", uptime: process.uptime()});
	});

	app.all("/*wildcard", (req, res) => {
		res.status(404).json({
			status: "fail",
			message: `${req.method} : ${req.originalUrl} not found.`,
		});
	});

	app.use("/api", appRouter);

	return app;
};

export default createApp;
