const mongoose = require("mongoose");

const expireTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

module.exports = mongoose.model("ExpireToken", expireTokenSchema);
