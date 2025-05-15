import { PORT } from "./secrets";
import { Request, Response } from "express";
import createApp from "./app";

const app = createApp();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to IT ASSET INVENTORY SERVER");
});

app.listen(PORT, () => console.log("Server running"));
