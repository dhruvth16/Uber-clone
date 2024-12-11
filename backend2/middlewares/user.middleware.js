const userModel = require("../models/user.model.js");
const ExpireToken = require("../models/expireToken.model.js");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  const isTokenExpired = await ExpireToken.findOne({ token });

  if (isTokenExpired) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded._id });
    req.user = user;
    return next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  const isTokenExpired = await ExpireToken.findOne({ token });

  if (isTokenExpired) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findOne({ _id: decoded._id });
    req.captain = captain;
    return next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
