const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      enum: ["car", "bike", "auto"],
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

captainSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

captainSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashpassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
