const express = require("express");
const {Op} = require("sequelize");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");

const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {all} = require("./spots");

const router = express.Router();

//delete a spot image
router.delete("/:imageId", requireAuth, async (req, res) => {
  const imgId = req.params.imageId;

  const deleteImg = await SpotImage.findByPk(imgId);

  if (!deleteImg)
    return res.status(404).json({message: "Spot Image couldn't be found"});

  const spotId = deleteImg.spotId;

  const spot = await Spot.findByPk(spotId);

  if (spot.ownerId === req.user.id) {
    await deleteImg.destroy();
    return res.json({message: "Successfully deleted"});
  } else {
    return res
      .status(403)
      .json({message: "You are not authorized to delete this image"});
  }
});

module.exports = router;
