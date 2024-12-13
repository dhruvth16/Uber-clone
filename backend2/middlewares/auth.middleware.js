const userModel = require("../models/user.model.js");
const captainModel = require("../models/captain.model.js");
const ExpireToken = require("../models/expireToken.model.js");
const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  // Check if the token is expired or revoked
  const isTokenExpired = await ExpireToken.findOne({ token });
  console.log(isTokenExpired);
  if (isTokenExpired) {
    throw new Error("Token is expired or revoked");
  }

  // Decode the JWT
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded payload:", decoded);
    return decoded; // Should include `_id`
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("JWT token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid JWT token");
    }
    throw new Error("Token verification failed");
  }
};

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Decode and verify the token
    const decoded = await verifyToken(token);

    if (!decoded._id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // Find the user in the database
    const user = await userModel.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user information to the request
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.status(500).json({ error: error.message });
  }
};

// Middleware for captain authentication
module.exports.authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Decode and verify the token
    const decoded = await verifyToken(token);

    if (!decoded._id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // Find the user in the database
    const captain = await captainModel.findOne({ _id: decoded._id });

    if (!captain) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user information to the request
    req.captain = captain;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.status(500).json({ error: error.message });
  }
};
