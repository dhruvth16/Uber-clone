const userModel = require("../models/user.model.js");
const captainModel = require("../models/captain.model.js");
const ExpireToken = require("../models/expireToken.model.js");
const jwt = require("jsonwebtoken");

// Helper function to verify tokens
const verifyToken = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  // Check if token is expired or revoked
  const isTokenExpired = await ExpireToken.findOne({ token });
  if (isTokenExpired) {
    throw new Error("Token is expired or revoked");
  }

  // Verify the JWT
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Middleware for user authentication
module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const decoded = await verifyToken(token);

    // Find the user in the database
    const user = await userModel.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user information to the request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(401).json({ error: error.message });
  }
};

// Middleware for captain authentication
module.exports.authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const decoded = await verifyToken(token);

    // Find the captain in the database
    const captain = await captainModel.findOne({ _id: decoded._id });
    if (!captain) {
      return res.status(404).json({ error: "Captain not found" });
    }

    // Attach captain information to the request
    req.captain = captain;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(401).json({ error: error.message });
  }
};
