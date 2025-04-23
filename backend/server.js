const express = require("express");
const cors = require("cors");
const routes = require("./routes/root.route.js");
const { PORT, SECRET_KEY } = require("./secrets.js");
const morgan = require("morgan");

const session = require("express-session");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);

app.get("/", (req, res) => res.send("Welcome to IT ASSET INVENTORY SERVER"));

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // 30 minutes
      httpOnly: true, // This makes the cookie HTTP-only
      secure: false, // Set to true in production if using HTTPS
    },
  })
);

//  Using res.cookie to set an httpOnly cookie

app.get("/set-cookie", (req, res) => {
  res.cookie("myHttpOnlyCookie", "cookieValue", {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    secure: false,
  });
  res.send("Cookie has been set");
});

app.listen(PORT, console.log("Server running"));
