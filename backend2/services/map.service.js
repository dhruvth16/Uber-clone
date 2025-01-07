const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAdressCoordinate = async (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: process.env.MAP_ACCESS_TOKEN,
      },
    });
    const data = await response.data;
    // console.log(data.features);

    return data.features.map((feature) => ({
      // place: feature.place_name,
      lng: feature.center[0],
      lat: feature.center[1],
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required");
  }

  const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${origin};${destination}`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: process.env.MAP_ACCESS_TOKEN,
      },
    });

    const data = response.data;
    console.log(data);

    if (data.code === "Ok") {
      const { durations, destinations, sources } = data;

      const travelTimeSeconds = durations[0][1];
      const travelTimeMinutes = Math.round(travelTimeSeconds / 60);
      const travelTimeHours = Math.round(travelTimeMinutes / 60);

      const travelDistance = destinations[1].distance;
      const travelDistanceKm = (travelDistance / 1000).toFixed(2);

      return {
        source: sources[0].name || "Unnamed Source",
        destination: destinations[1].name || "Unnamed Destination",
        distance: `${travelDistanceKm} km`,
        time: `${travelTimeHours} minutes`,
      };
    } else {
      throw new Error("Mapbox API returned an error");
    }
  } catch (error) {
    console.error("Error fetching data from Mapbox API:", error.message);
    throw error;
  }
};

module.exports.getAddressSuggestions = async (input, proximity) => {
  if (!input) {
    throw new Error("input is required for address suggestions");
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    input
  )}.json`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: process.env.MAP_ACCESS_TOKEN,
        proximity: proximity || "", // proximity is optional here
        autocomplete: true,
        limit: 5,
        types: "address,place,locality",
      },
    });

    const data = response.data;

    const suggestions = data.features.map((feature) => ({
      place_name: feature.place_name,
    }));

    return suggestions;
  } catch (error) {
    console.error("Error fetching address suggestions:", error.message);
    throw error;
  }
};

module.exports.getCaptainsInTheRadius = async (lng, ltd, radius) => {
  if (!lng || !ltd || !radius) {
    throw new Error("lng, ltd, radius and distance are required");
  }

  try {
    // radius in km
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, ltd], radius / 6371],
        },
      },
      // distance: { $lte: distance },
    });
    // console.log(captains);

    return captains;
  } catch (error) {
    console.error("Error fetching captains in the radius:", error.message);
    throw error;
  }
};
