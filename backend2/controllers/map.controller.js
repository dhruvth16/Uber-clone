const mapService = require("../services/map.service");
const { validationResult } = require("express-validator");

exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;

  try {
    const coordinates = await mapService.getAdressCoordinate(address);
    res.status(200).json({ coordinates });
  } catch (error) {
    console.error("Get Coordinates Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;

  try {
    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json({ distanceTime });
  } catch (error) {
    console.error("Get Distance Time Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;

  try {
    const suggestions = await mapService.getAddressSuggestions(input);
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Get Suggestions Error:", error);
    res.status(500).json({ error: error.message });
  }
};
