const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, fullname, vehicle } = req.body;

  const hashedPassword = await captainModel.hashPassword(password);

  try {
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }
    const isPasswordMatch = captain.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = captain.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.captain._id);
    res.status(200).json({ captain });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.logout = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blackListTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfully" });
};
