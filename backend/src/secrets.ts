import { config } from "dotenv";

config({ path: ".env" });

export const PORT: string = process.env.PORT!;

export const DB_URI: string = process.env.DB_URI!;

export const SECRET_KEY: string = process.env.SECRET_KEY!;

export const URL: string = process.env.FRONTEND_URL!;
