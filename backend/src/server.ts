import {Request, Response} from "express";
import createApp from "./app";
import {dbConn} from "./config/dbconfig";
import {PORT} from "./secrets";

const app = createApp();

app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to IT ASSET INVENTORY SERVER");
});

app.listen(PORT, async () => {
	const connected = await dbConn();
	if (connected) {
		console.log("Server running on port " + PORT);
	} else {
		throw new Error("Could not connect to db server");
	}
});
