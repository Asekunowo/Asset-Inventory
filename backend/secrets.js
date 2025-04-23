const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const PORT = process.env.PORT;

const DB_URI = process.env.DB_URI;

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = { PORT, DB_URI, SECRET_KEY };
