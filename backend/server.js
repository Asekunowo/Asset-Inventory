const express = require("express");
const cors = require("cors");
const routes = require("./routes/root.route.js");
const { PORT } = require("./secrets.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => res.send("Welcome to IT ASSET INVENTORY SERVER"));

app.listen(PORT, console.log("Server running"));
