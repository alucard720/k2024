const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split("")[1];
  if (!token) {
    return res.status(401).json({ error: "missin token" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token invalido" });
    }
    req.user = user;
    next();
  });
}

module.exports = verifyToken;
