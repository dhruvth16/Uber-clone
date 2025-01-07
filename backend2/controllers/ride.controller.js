const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service.js");
const mapService = require("../services/map.service.js");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model.js");

exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickupAddress, destinationAddress, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickupAddress,
      destinationAddress,
      vehicleType,
    });

    res.status(201).json(ride);
    const pickUpCoordinates = await mapService.getAdressCoordinate(
      pickupAddress
    );
    // const distanceTime = await mapService.getDistanceTime(
    //   `${pickUpCoordinates[0].lng},${pickUpCoordinates[0].lat}`,
    //   destinationAddress
    // );
    // console.log("Distance Time: ", distanceTime);
    // console.log("Pickup Coordinates: ", pickUpCoordinates[0].lng);
    const captainInRadius = await mapService.getCaptainsInTheRadius(
      pickUpCoordinates[0].lng,
      pickUpCoordinates[0].lat,
      // distanceTime.distance,
      50
    );
    // console.log("Captains: ", captainInRadius);

    ride.otp = "";
    const rideDetailsUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    captainInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideDetailsUser,
      });
    });
  } catch (error) {
    console.error("Create Ride Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickupAddress, destinationAddress } = req.query;
  try {
    const fare = await rideService.getFare(pickupAddress, destinationAddress);
    res.status(200).json({ fare });
  } catch (error) {
    console.error("Get Fare Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  if (!rideId) {
    return res.status(400).json({ error: "Ride ID is required" });
  }

  try {
    const ride = await rideService.confirmRide(rideId, req.captain._id);

    sendMessageToSocketId(ride.user?.socketId, {
      event: "ride-accepted",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (error) {
    console.error("Confirm Ride Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;
  // console.log("Ride ID: ", rideId);
  // console.log("OTP: ", otp);
  if (!rideId || !otp) {
    return res.status(400).json({ error: "Ride ID and OTP are required" });
  }

  try {
    const ride = await rideService.startRide(rideId, otp, req.captain._id);

    sendMessageToSocketId(ride.user?.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (error) {
    console.error("Start Ride Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.cancelRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.query;
  // console.log("Ride ID: ", rideId);

  if (!rideId) {
    return res.status(400).json({ error: "Ride ID is required" });
  }

  if (!req.captain || !req.captain._id) {
    return res.status(400).json({ error: "Captain information is missing" });
  }

  try {
    const ride = await rideService.cancelRide(rideId, req.captain._id);
    // console.log("Ride Cancelled: ", ride);
    // console.log(ride.user?.socketId);

    sendMessageToSocketId(ride.user?.socketId, {
      event: "ride-cancelled",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (error) {
    console.error("Cancel Ride Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.finishRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  console.log("Ride ID: ", rideId);

  if (!rideId) {
    return res.status(400).json({ error: "Ride ID is required" });
  }

  if (!req.captain || !req.captain._id) {
    return res.status(400).json({ error: "Captain information is missing" });
  }

  try {
    const ride = await rideService.finishRide(rideId, req.captain._id);
    // console.log("Ride Finished: ", ride);
    console.log(ride.user?.socketId);

    sendMessageToSocketId(ride.user?.socketId, {
      event: "ride-finished",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (error) {
    console.error("Finish Ride Error:", error);
    return res.status(500).json({ error: error.message });
  }
};
