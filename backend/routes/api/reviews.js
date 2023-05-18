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

// const validateReview = [
//   check("review")
//     .exists({checkFalsy: true})
//     .withMessage("Review text is required"),
//   check("stars")
//     .exists({checkFalsy: true})
//     .isInt({min: 1, max: 5})
//     .withMessage("Stars must be an integer from 1-5"),
//   handleValidationErrors,
// ];

//add an image to a review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const {url} = req.body;
  const reviewId = req.params.reviewId;

  const findReview = await Review.findByPk(reviewId);
  console.log("###REveview BELOW");
  console.log(findReview);

  if (!findReview) res.status(404).json({message: "Review couldn't be found"});

  if (findReview.userId !== req.user.id)
    res.status(401).json({message: "You are not authorized to add an image."});

  const reviewImages = await ReviewImage.findAll({
    where: {reviewId: findReview.id},
  });

  if (reviewImages.length >= 10)
    res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });

  let newReviewImage = await ReviewImage.create({
    reviewId: reviewId,
    url,
  });

  newReviewImage = newReviewImage.toJSON();

  delete newReviewImage.reviewId;
  delete newReviewImage.createdAt;
  delete newReviewImage.updatedAt;

  return res.json(newReviewImage);
});

//edit a review
router.put("/:reviewId", requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const findReview = await Review.findByPk(reviewId);

  if (!findReview || findReview.userId !== req.user.id)
    res.status(404).json({message: "Reveiw couldn't be found"});

  const {review, stars} = req.body;

  const reviewError = {
    message: "Bad Request",
    errors: {},
  };

  if (review.length <= 0) reviewError.errors.review = "Review text is required";
  if (!stars || stars < 1 || stars > 5)
    reviewError.errors.stars = "Stars must be an integer from 1 to 5";

  if (Object.keys(reviewError.errors).length > 0)
    return res.status(400).json(reviewError);

  await findReview.update({
    review,
    stars,
  });

  await findReview.save();
  return res.status(200).json(findReview);
});

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

//delete an exisiting review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;

  const deleteReview = await Review.findOne({
    where: {
      userId: req.user.id,
      id: reviewId,
    },
  });

  if (!deleteReview)
    return res.status(404).json({message: "Review couldn't be found"});

  await deleteReview.destroy();

  res.json({message: "Successfully deleted"});
});

module.exports = router;
