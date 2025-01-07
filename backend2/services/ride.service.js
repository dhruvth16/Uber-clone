const rideModel = require("../models/ride.model");
const mapService = require("./map.service");
const crypto = require("crypto");

async function getFare(pickupAddress, destinationAddress) {
  if (!pickupAddress || !destinationAddress) {
    throw new Error("Missing required fields");
  }

  try {
    const pickUpCoordinate = await mapService.getAdressCoordinate(
      pickupAddress
    );
    if (!pickUpCoordinate) {
      throw new Error("Failed to fetch or parse pickup coordinates");
    }

    const destinationCoordinate = await mapService.getAdressCoordinate(
      destinationAddress
    );
    if (!destinationCoordinate) {
      throw new Error("Failed to fetch or parse destination coordinates");
    }

    const pickUp = `${pickUpCoordinate[0].lng},${pickUpCoordinate[0].lat}`;
    const destination = `${destinationCoordinate[0].lng},${destinationCoordinate[0].lat}`;

    const distanceTime = await mapService.getDistanceTime(pickUp, destination);
    if (!distanceTime || !distanceTime.distance || !distanceTime.time) {
      throw new Error("Failed to fetch distance and time information");
    }

    const baseFare = {
      auto: 30,
      car: 50,
      bike: 20,
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      bike: 8,
    };

    const perMinuteRate = {
      auto: 2,
      car: 3,
      bike: 1.5,
    };

    const distanceInKm = parseFloat(distanceTime.distance) / 1000;
    // console.log(distanceInKm);
    const durationInMinutes = distanceTime.time.split(" ")[0];
    // console.log(durationInMinutes);
    const fare = {
      auto: Math.round(
        baseFare.auto +
          distanceInKm * perKmRate.auto +
          durationInMinutes * perMinuteRate.auto
      ),
      car: Math.round(
        baseFare.car +
          distanceInKm * perKmRate.car +
          durationInMinutes * perMinuteRate.car
      ),
      bike: Math.round(
        baseFare.bike +
          distanceInKm * perKmRate.bike +
          durationInMinutes * perMinuteRate.bike
      ),
    };

    return fare;
  } catch (error) {
    console.error("Error in getFare:", error);
    throw new Error("Failed to calculate fare");
  }
}

module.exports.getFare = getFare;

function generateOtp(num) {
  if (!num || num <= 0) {
    throw new Error("Invalid OTP length");
  }

  let otp = "";
  for (let i = 0; i < num; i++) {
    otp += crypto.randomInt(0, 10).toString();
  }

  return otp;
}

module.exports.createRide = async ({
  user,
  pickupAddress,
  destinationAddress,
  vehicleType,
}) => {
  if (!user || !pickupAddress || !destinationAddress || !vehicleType) {
    throw new Error("Missing required fields");
  }

  const fare = await getFare(pickupAddress, destinationAddress);
  // console.log(vehicleType);
  // console.log(fare[vehicleType]);
  const otp = generateOtp(6);

  try {
    const ride = rideModel.create({
      user,
      pickupAddress,
      destinationAddress,
      vehicleType,
      otp,
      fare: fare[vehicleType],
    });

    return ride;
  } catch (error) {
    console.error("Create Ride Error:", error);
    throw new Error("Failed to create ride");
  }
};

module.exports.confirmRide = async (rideId, captain) => {
  if (!rideId || !captain) {
    throw new Error("Ride ID and Captain ID are required");
  }

  try {
    const updatedRide = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { captain: captain.toString(), status: "accepted" },
      { new: true }
    );

    if (!updatedRide) {
      throw new Error("Ride not found");
    }

    const populatedRide = await rideModel
      .findOne({ _id: updatedRide._id })
      .populate("user")
      .populate("captain")
      .select("+otp");

    // console.log("Ride after confirmation: ", populatedRide);
    return populatedRide;
  } catch (error) {
    console.error("Error confirming ride:", error);
    throw new Error("Failed to confirm ride");
  }
};

module.exports.startRide = async (rideId, otp, captain) => {
  console.log(rideId, otp, captain);
  if (!rideId || !otp || !captain.toString()) {
    throw new Error("Ride ID, OTP and Captain ID are required");
  }

  try {
    const updatedRide = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { status: "ongoing" },
      { new: true }
    );
    const populatedRide = await rideModel
      .findOne({ _id: updatedRide._id })
      .populate("user")
      .populate("captain");

    return populatedRide;
  } catch (error) {
    console.error("Error starting ride:", error);
    throw new Error("Failed to start ride");
  }
};

module.exports.cancelRide = async (rideId, user) => {
  if (!rideId || !user) {
    throw new Error("Ride ID and User ID are required");
  }

  try {
    const updatedRide = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { status: "rejected" },
      { new: true }
    );

    const populatedRide = await rideModel
      .findOne({ _id: updatedRide._id })
      .populate("user")
      .populate("captain");

    return populatedRide;
  } catch (error) {
    console.error("Error cancelling ride:", error);
    throw new Error("Failed to cancel ride");
  }
};

module.exports.finishRide = async (rideId, user) => {
  if (!rideId || !user) {
    throw new Error("Ride ID and Captain ID are required");
  }

  try {
    const ride = await rideModel
      .findOne({
        _id: rideId,
        captain: user,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.status !== "ongoing") {
      throw new Error("Ride not ongoing");
    }

    await rideModel.findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "completed",
      },
      { new: true }
    );

    return ride;
  } catch (error) {
    console.error("Error finishing ride:", error);
    throw new Error("Failed to finish ride");
  }
};
