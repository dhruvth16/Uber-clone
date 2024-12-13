const mongoose = require("mongoose");

const expireTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expireAt: "1d",
  },
});

module.exports = mongoose.model("ExpireToken", expireTokenSchema);
