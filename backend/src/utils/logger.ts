import fs from "fs";
import morgan from "morgan";
import path from "path";
import winston from "winston";
import createApp from "../app";

const app = createApp();

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3, // Custom level for HTTP requests, used by Morgan
	verbose: 4,
	debug: 5,
	silly: 6,
};

const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	verbose: "cyan",
	debug: "blue",
	silly: "grey",
};

winston.addColors(colors);

const logFormat = winston.format.combine(
	winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const parentLogDir = path.join(__dirname, "..", "logs");

const logger = winston.createLogger({
	levels: levels,
	format: logFormat,
	transports: [
		// Console transport: Logs messages to the console
		// new winston.transports.Console({
		// 	level: "debug", // Log messages with level 'debug' and above to console
		// 	format: winston.format.combine(
		// 		winston.format.colorize({all: true}), // Add colors to console output
		// 		logFormat, // Use the custom format defined above
		// 	),
		// }),

		// File transport: Logs messages to a file
		new winston.transports.File({
			filename: path.join(parentLogDir, "error.log"), // Path for error logs
			level: "error", // Only log messages with level 'error' to this file
			maxsize: 5 * 1024 * 1024, // 5MB max file size
			maxFiles: 5, // Keep 5 files (error.log, error.log.1, etc.)
			tailable: true, // Show the last 5 files when rotated
		}),
		new winston.transports.File({
			filename: path.join(parentLogDir, "combined.log"), // Path for all logs
			level: "info", // Log messages with level 'info' and above to this file
			maxsize: 10 * 1024 * 1024, // 10MB max file size
			maxFiles: 10, // Keep 10 files
			tailable: true,
		}),
	],
	exitOnError: false, // Do not exit on handled exceptions
});

// Create 'logs' directory if it doesn't exist
const logDir = path.join(parentLogDir);
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

// 4. Configure Morgan for HTTP Request Logging
// Create a write stream (append mode) for HTTP access logs
const accessLogStream = fs.createWriteStream(
	path.join(parentLogDir, "access.log"),
	{flags: "a"}, // 'a' means append
);

app.use(morgan("combined", {stream: accessLogStream}));

export default logger;
