const express = require("express");
const {Op} = require("sequelize");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {User, Spot, SpotImage, Booking} = require("../../db/models");

const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");

const router = express.Router();

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;

  const deleteSpot = await Spot.findOne({
    where: {id: bookingId, ownerId: req.user.id},
  });

  if (!deleteSpot) {
    return res.status(404).json({message: "Spot couldn't be found"});
  }

  await deleteSpot.destroy();

  res.json({message: "Successfully deleted"});
});

module.exports = router;
