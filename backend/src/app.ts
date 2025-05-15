import express, { Express } from "express";
import cors from "cors";
import routes from "./routes/root.route";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { URL } from "./secrets";

const createApp = () => {
  const app: Express = express();

  app.use(express.json());

  const corsOptions = {
    origin: URL,
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use(morgan("dev"));

  app.use("/api", routes);

  return app;
};

export default createApp;
