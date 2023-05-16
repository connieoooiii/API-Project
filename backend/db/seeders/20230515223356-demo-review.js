"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const reviews = [
  {
    spotId: 1,
    userId: 2,
    review:
      "I had an absolutely wonderful stay at the Pacifica Beach Cottage. The cozy atmosphere and stunning views made it the perfect retreat. ",
    stars: 5,
  },
  {
    spotId: 2,
    userId: 3,
    review:
      "The Seattle condo was the perfect choice for my stay. The modern and stylish design combined with the unbeatable location next to the Space Needle made it a truly memorable experience. The breathtaking views of the city skyline added an extra touch of luxury to my stay.",
    stars: 5,
  },
  {
    spotId: 3,
    userId: 4,
    review:
      "While the Manhattan condo had a great location and vibrant neighborhood, the overall experience fell slightly short of expectations. The beautiful brownstone architecture added charm, but the condo lacked some essential amenities and the price seemed a bit high. Nonetheless, it served as a decent base for exploring the city",
    stars: 3.5,
  },
  {
    spotId: 4,
    userId: 1,
    review:
      "I had a fantastic stay at the Honolulu apartment. The panoramic oceanview from the apartment was absolutely breathtaking and the proximity to the beach was a major highlight. The only reason I couldn't give it a full 5 stars was some minor maintenance issues.",
    stars: 4,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, reviews, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options.tableName, {}, {});
  },
};
