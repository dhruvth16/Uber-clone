const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const VehicleType = require("../enums/vehicleType.enum.js");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLen: (3)["Length should be at least 3 characters"],
    },
    lastname: {
      type: String,
      minLen: (3)["Length should be at least 3 characters"],
    },
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
    },
    plate: {
      type: String,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity should be at least 1"],
    },
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      required: true,
    },
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

captainSchema.methods.comparePassword = async function (comparePassword) {
  return await bcrypt.compare(comparePassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
