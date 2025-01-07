const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controller");

router.post(
  "/create",
  authMiddleware.authUser,
  [
    body("pickupAddress")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Pick-up Address"),
    body("destinationAddress")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Destination Address"),
    body("vehicleType").isString().isLength({ min: 3 }),
  ],
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  [
    query("pickupAddress").isString().isLength({ min: 3 }),
    query("destinationAddress").isString().isLength({ min: 3 }),
  ],
  rideController.getFare
);

router.post(
  "/accept-ride",
  authMiddleware.authCaptain,
  rideController.confirmRide
);

router.get(
  "/start-ride",
  query("otp").isString().isLength({ min: 6, max: 6 }),
  authMiddleware.authCaptain,
  rideController.startRide
);

router.get(
  "/cancel-ride",
  authMiddleware.authCaptain,
  rideController.cancelRide
);

router.post(
  "/finish-ride",
  authMiddleware.authCaptain,
  rideController.finishRide
);

module.exports = router;
