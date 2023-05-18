const express = require("express");
const {Op} = require("sequelize");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {User, Spot, SpotImage, Review, ReviewImage} = require("../../db/models");

const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {all} = require("./spots");

const router = express.Router();

const spotAvgPreview = (spots) => {
  let spotsArr = [];

  for (let spot of spots) {
    spotsArr.push(spot.toJSON());
  }

  for (let spot of spotsArr) {
    let sum = 0;
    spot.Reviews.forEach((review) => {
      sum += review.stars;
    });
    //console.log("this is spot review !!!!!!!" + spot.Reviews);
    //console.log("@@@@@" + sum);
    spot.avgRating = sum / spot.Reviews.length;

    delete spot.Reviews;
  }

  for (let spot of spotsArr) {
    //console.log("#### spot.SpotImages" + spot.SpotImages);
    for (let image of spot.SpotImages) {
      if (image.preview === true) {
        spot.previewImage = image.url;
      }
    }
    if (!spot.previewImage) {
      spot.previewImage = "No preview image found";
    }

    delete spot.SpotImages;
  }

  return spotsArr;
};

//get all reviews by spot's id
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  if (!spot) res.status(404).json({message: "Spot couldn't be found"});

  const Reviews = await Review.findAll({
    where: {
      spotId: spotId,
    },

    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  return res.json({Reviews});
});

//get details of a spot from an id
router.get("/:spotId", async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
      {model: Review},
    ],
  });

  if (!spot) return res.status(404).json({message: "Spot couldn't be found"});

  const spotJson = spot.toJSON();
  spotJson.numReviews = spot.Reviews.length;

  const avgStarRating = (
    spotJson.Reviews.reduce((sum, review) => sum + review.stars, 0) /
    spot.Reviews.length
  ).toFixed(1);

  spotJson.avgStarRating = spot.Reviews.length ? avgStarRating : null;

  delete spotJson.Reviews;

  const updatedSpotJson = {
    id: spotJson.id,
    ownerId: spotJson.ownerId,
    address: spotJson.address,
    city: spotJson.city,
    state: spotJson.state,
    country: spotJson.country,
    lat: spotJson.lat,
    lng: spotJson.lng,
    name: spotJson.name,
    description: spotJson.description,
    price: spotJson.price,
    createdAt: spotJson.createdAt,
    updatedAt: spotJson.updatedAt,
    numReviews: spotJson.numReviews,
    avgStarRating: spotJson.avgStarRating,
    SpotImages: spotJson.SpotImages,
    Owner: spotJson.Owner,
  };

  return res.json(updatedSpotJson);
});

//get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [{model: Review}, {model: SpotImage}],
  });

  const Spots = spotAvgPreview(spots);

  return res.json({Spots});
});

//get all spots owner by the current user
router.get("/current", requireAuth, async (req, res) => {
  const userSpots = await Spot.findAll({
    where: {ownerId: req.user.id},
    include: [{model: Review}, {model: SpotImage}],
  });

  const Spots = spotAvgPreview(userSpots);

  return res.json({Spots});
});

//add an image to a spot based on spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const {url, preview} = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) return res.status(404).json({message: "Spot couldn't be found"});

  if (spot.ownerId !== req.user.id)
    res.status(401).json({message: "You are not authorized to add an image."});

  let newSpotImage = await SpotImage.create({spotId: spot.id, url, preview});
  newSpotImage = newSpotImage.toJSON();
  delete newSpotImage.createdAt;
  delete newSpotImage.updatedAt;
  delete newSpotImage.spotId;

  return res.json(newSpotImage);
});

//create a review for a spot based on spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const {review, stars} = req.body;
  const {user} = req;

  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  if (!spot) res.status(404).json({message: "Spot couldn't be found"});

  const userReview = await Review.findOne({
    where: {
      spotId: spotId,
      userId: user.id,
    },
  });
  if (userReview)
    res.status(500).json({message: "User already has a review for this spot"});

  const reviewError = {
    message: "Bad Request",
    errors: {},
  };

  if (review.length <= 0) reviewError.errors.review = "Review text is required";
  if (!stars || stars < 1 || stars > 5)
    reviewError.errors.stars = "Stars must be an integer from 1 to 5";

  if (Object.keys(reviewError.errors).length > 0)
    return res.status(400).json(reviewError);

  const newReview = await Review.create({
    spotId: spotId,
    userId: user.id,
    review,
    stars,
  });

  return res.status(201).json(newReview);
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

//delete a spot
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
