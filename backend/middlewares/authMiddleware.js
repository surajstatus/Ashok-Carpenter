// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default verifyAdmin;
