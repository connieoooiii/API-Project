const express = require("express");
const {Op} = require("sequelize");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {User, Spot, SpotImage} = require("../../db/models");

const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");

const router = express.Router();

//get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [{model: SpotImage}],
  });

  return res.json(spots);
});

//create a spot
router.post("/", requireAuth, async (req, res) => {
  const {address, city, state, country, lat, lng, name, description, price} =
    req.body;

  const ownerId = req.user.id;

  const spotError = {
    message: "Bad Request",
    errors: {},
  };

  if (!address) spotError.errors.address = "Street address is required";
  if (!city) spotError.errors.city = "City is required";
  if (!state) spotError.errors.state = "State is required";
  if (!country) spotError.errors.country = "Country is required";
  if (!lat || lat < -90 || lat > 90)
    spotError.errors.lat = "Latitude is not valid";
  if (!lng || lng < -180 || lng > 180)
    spotError.errors.lng = "Longitude is not valid";
  if (!name || name.length > 50)
    spotError.errors.name = "Name must be less than 50 characters";
  if (!description) spotError.errors.description = "Description is required";
  if (!price) spotError.errors.price = "Price per day is required";

  if (Object.keys(spotError.errors).length > 0)
    return res.status(400).json(spotError);

  const createSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  return res.status(201).json(createSpot);
});

//edit spot
router.put("/:spotId", requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (!spot || spot.ownerId !== req.user.id)
    return res.status(404).json({message: "Spot couldn't be found"});

  const {address, city, state, country, lat, lng, name, description, price} =
    req.body;

  const spotError = {
    message: "Bad Request",
    errors: {},
  };

  if (!address) spotError.errors.address = "Street address is required";
  if (!city) spotError.errors.city = "City is required";
  if (!state) spotError.errors.state = "State is required";
  if (!country) spotError.errors.country = "Country is required";
  if (!lat || lat < -90 || lat > 90)
    spotError.errors.lat = "Latitude is not valid";
  if (!lng || lng < -180 || lng > 180)
    spotError.errors.lng = "Longitude is not valid";
  if (!name || name.length > 50)
    spotError.errors.name = "Name must be less than 50 characters";
  if (!description) spotError.errors.description = "Description is required";
  if (!price) spotError.errors.price = "Price per day is required";

  if (Object.keys(spotError.errors).length > 0)
    return res.status(400).json(spotError);

  await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  await spot.save();

  return res.status(200).json(spot);
});

router.delete("/:spotId", requireAuth, async (req, res) => {
  const spotId = req.params.spotId;

  const deleteSpot = await Spot.findOne({
    where: {id: spotId, ownerId: req.user.id},
  });

  if (!deleteSpot) {
    return res.status(404).json({message: "Spot couldn't be found"});
  }

  await deleteSpot.destroy();

  res.json({message: "Successfully deleted"});
});

module.exports = router;