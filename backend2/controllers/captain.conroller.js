const captainModel = require("../models/captain.model.js");
const { validationResult } = require("express-validator");
const expireTokenModel = require("../models/expireToken.model.js");
const captainService = require("../services/captain.service.js");
const VehicleType = require("../enums/vehicleType.enum.js");

exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  if (!Object.values(VehicleType).includes(vehicle.vehicleType)) {
    return res.status(400).json({
      message: `Invalid vehicleType. Allowed values are: ${Object.values(
        VehicleType
      ).join(", ")}`,
    });
  }

  const isCaptainAlreadyExists = await captainModel.findOne({ email });

  if (isCaptainAlreadyExists) {
    return res.status(400).json({ message: "Captain already exist" });
  }
  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email: email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  console.log(captain);

  res.status(201).json({ token, captain });
};

exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Ensure user is found
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    // Ensure comparePassword method is correctly implemented
    if (!captain.comparePassword) {
      return res
        .status(500)
        .json({ message: "Authentication method not available" });
    }

    const isPasswordMatch = await captain.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCaptainProfile = async (req, res) => {
  // console.log(req.captain);
  res.status(200).json({ captain: req.captain });
};

exports.logoutCaptain = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await expireTokenModel.create({ token });
  res.status(200).json({ message: "Logout successfully" });
};
