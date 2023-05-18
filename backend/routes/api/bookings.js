const express = require("express");
const {Op} = require("sequelize");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {User, Spot, SpotImage, Booking} = require("../../db/models");

const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");

const router = express.Router();

//get all current user's booking
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const allBookings = await Booking.findAll({
    where: {userId: userId},
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: [
          {
            model: SpotImage,
            attributes: ["id", "url", "preview"],
          },
        ],
      },
    ],
  });

  //console.log(allBookings);
  let Bookings = [];

  for (let booking of allBookings) {
    booking = booking.toJSON();
    Bookings.push(booking);
  }

  //console.log(Bookings);
  Bookings.forEach((booking) => {
    booking.Spot.SpotImages.forEach((image) => {
      if (image.preview === true) {
        booking.Spot.previewImage = image.url;
        delete booking.Spot.SpotImages;
      }
    });
  });

  return res.json({Bookings});
});

//delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;

  const deleteBooking = await Booking.findOne({
    where: {id: bookingId, userId: req.user.id},
  });

  if (!deleteBooking) {
    return res.status(404).json({message: "Booking couldn't be found"});
  }

  if (new Date() >= new Date(deleteBooking.startDate))
    return res
      .status(403)
      .json({message: "Bookings that have been started can't be deleted"});

  await deleteBooking.destroy();

  res.json({message: "Successfully deleted"});
});

module.exports = router;
