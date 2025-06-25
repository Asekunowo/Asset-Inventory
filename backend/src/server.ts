import {Request, Response} from "express";
import createApp from "./app";
import {dbConn} from "./config/dbconfig";
import {PORT} from "./secrets";
import logger from "./utils/logger";

const app = createApp();

app.get("/", (req: Request, res: Response) => {
	logger.info("GET / route accessed"); // Log an info message

	res.send("Welcome to IT ASSET INVENTORY SERVER");
	logger.verbose("Get requested finished executing");
});

app.listen(PORT, async () => {
	const connected = await dbConn();
	if (connected) {
		console.log("Server running");
		logger.info(`Server listening on port ${PORT}`); // Log server start
	} else {
		throw new Error("Could not connect to db server");
	}
});
