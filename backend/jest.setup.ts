import {config} from "dotenv";
import path from "path";

// Load .env.test if NODE_ENV is 'test'
if (process.env.NODE_ENV === "test") {
	config({path: path.resolve(__dirname, ".env.test")});
} else {
	config(); // Load default .env for other environments if needed
}
