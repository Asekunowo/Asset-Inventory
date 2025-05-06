import cors from "cors";
import routes from "../src/routes/root.route";
import { PORT } from "./secrets";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to IT ASSET INVENTORY SERVER");
});

app.listen(PORT, () => console.log("Server running"));
