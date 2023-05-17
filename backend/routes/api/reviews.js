const express = require("express");
const {Op} = require("sequelize");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  ReviewImage,
  Review,
  Booking,
} = require("../../db/models");

const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");

const router = express.Router();

//get all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  const allReviews = await Review.findAll({
    where: {userId: req.user.id},
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: {exclude: ["createdAt", "updatedAt", "description"]},
        include: {
          model: SpotImage,
          attributes: ["url"],
          where: {preview: true},
        },
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  if (!allReviews) res.json({message: "There are no reviews"});

  for (let i = 0; i < allReviews.length; i++) {
    const review = allReviews[i].toJSON();
    if (review.Spot) {
      allReviews[i] = review;
      review.Spot.previewImage = review.Spot.SpotImages[0].url;
      delete review.Spot.SpotImages;
    }
  }

  return res.json({Reviews: allReviews});
});

module.exports = router;
