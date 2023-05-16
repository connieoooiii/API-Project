"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "850 Breeze Way",
          city: "Pacifica",
          state: "CA",
          country: "United State of America",
          lat: 37.5935,
          lng: -122.4849,
          name: "Cozy Beach Cottage with Stunning Views",
          description:
            "Welcome to our cozy beach cottage with stunning views! Nestled in the charming coastal town of Pacifica, this charming retreat offers the perfect blend of comfort and tranquility.",
          price: 250,
        },
        {
          ownerId: 2,
          address: "6500 88th Ave SE",
          city: "Seattle",
          state: "WA",
          country: "United State of America",
          lat: 47.6205,
          lng: -122.3493,
          name: "Private Condo Next to Space Needle",
          description:
            "This modern and stylish retreat offers the perfect combination of comfort and convenience. With stunning views of the city skyline and steps away from the Space Needle, this will be your new home away from home.",
          price: 185,
        },
        {
          ownerId: 3,
          address: "5499 88th Ave",
          city: "Manhattan",
          state: "NY",
          country: "United State of America",
          lat: 40.7589,
          lng: -73.9851,
          name: "Beautiful Brownstone Condo",
          description:
            "Located in the vibrant neighborhood of Manhattan, you'll be just steps away from world-class dining, shopping, and entertainment. , Our beautiful brownstone condo offers an unparalleled experience for those visting the city.",
          price: 320,
        },
        {
          ownerId: 4,
          address: "1156 Ocean Ave",
          city: "Honolulu",
          state: "HI",
          country: "United State of America",
          lat: 21.2897,
          lng: -157.8354,
          name: "Panoramic Oceanview Apartment Steps From Beach",
          description:
            "This spacious and modern apartment offers a true beachfront retreat.Escape to paradise with our panoramic oceanview apartment and experience the beauty of Honolulu. Book your stay today and create unforgettable memories in this tropical paradise!",
          price: 290,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    const addressToDelete = [
      "850 Breeze Way",
      "6500 88th Ave SE",
      "5499 88th Ave",
      "1156 Ocean Ave",
    ];
    return queryInterface.bulkDelete(
      options,
      {address: {[Op.in]: addressToDelete}},
      {}
    );
  },
};
