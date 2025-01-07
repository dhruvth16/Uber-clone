const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  destinationAddress: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "rejected", "completed"],
    default: "pending",
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },

  paymentID: {
    type: String,
  },
  orderID: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
  },
});

const rideModel = mongoose.model("ride", rideSchema);

module.exports = rideModel;
