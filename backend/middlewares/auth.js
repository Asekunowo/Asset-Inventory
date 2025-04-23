const {
  verify,
  TokenExpiredError,
  JsonWebTokenError,
} = require("jsonwebtoken");
const { SECRET_KEY } = require("../secrets");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided. Please Login" });
    return;
  }

  try {
    const user = verify(token, SECRET_KEY);
    req.user = user;
    next();
    return;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({ message: "Token expired. Please Login Again" });
      return;
    }
    if (err instanceof JsonWebTokenError) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    res.status(500).json({ message: "Failed to authenticate token" });
    return;
  }
};

module.exports = { verifyToken };
