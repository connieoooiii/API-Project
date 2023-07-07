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
    spotId: 1,
    userId: 3,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4,
  },
  {
    spotId: 1,
    userId: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4.5,
  },
  {
    spotId: 2,
    userId: 3,
    review:
      "The Seattle condo was the perfect choice for my stay. The modern and stylish design combined with the unbeatable location next to the Space Needle made it a truly memorable experience. The breathtaking views of the city skyline added an extra touch of luxury to my stay.",
    stars: 4,
  },
  {
    spotId: 2,
    userId: 5,
    review:
      "The Seattle condo was the perfect choice for my stay. The modern and stylish design combined with the unbeatable location next to the Space Needle made it a truly memorable experience. The breathtaking views of the city skyline added an extra touch of luxury to my stay.",
    stars: 5,
  },
  {
    spotId: 2,
    userId: 6,
    review:
      "The Seattle condo was the perfect choice for my stay. The modern and stylish design combined with the unbeatable location next to the Space Needle made it a truly memorable experience. The breathtaking views of the city skyline added an extra touch of luxury to my stay.",
    stars: 4.5,
  },
  {
    spotId: 3,
    userId: 4,
    review:
      "While the Manhattan condo had a great location and vibrant neighborhood, the overall experience fell slightly short of expectations. The beautiful brownstone architecture added charm, but the condo lacked some essential amenities and the price seemed a bit high. Nonetheless, it served as a decent base for exploring the city",
    stars: 3.5,
  },
  {
    spotId: 3,
    userId: 6,
    review:
      "While the Manhattan condo had a great location and vibrant neighborhood, the overall experience fell slightly short of expectations. The beautiful brownstone architecture added charm, but the condo lacked some essential amenities and the price seemed a bit high. Nonetheless, it served as a decent base for exploring the city",
    stars: 3.5,
  },
  {
    spotId: 3,
    userId: 9,
    review:
      "While the Manhattan condo had a great location and vibrant neighborhood, the overall experience fell slightly short of expectations. The beautiful brownstone architecture added charm, but the condo lacked some essential amenities and the price seemed a bit high. Nonetheless, it served as a decent base for exploring the city",
    stars: 3.5,
  },
  {
    spotId: 3,
    userId: 10,
    review:
      "While the Manhattan condo had a great location and vibrant neighborhood, the overall experience fell slightly short of expectations. The beautiful brownstone architecture added charm, but the condo lacked some essential amenities and the price seemed a bit high. Nonetheless, it served as a decent base for exploring the city",
    stars: 3.5,
  },
  {
    spotId: 4,
    userId: 1,
    review:
      "I had a fantastic stay at the Honolulu apartment. The panoramic oceanview from the apartment was absolutely breathtaking and the proximity to the beach was a major highlight. The only reason I couldn't give it a full 5 stars was some minor maintenance issues.",
    stars: 5,
  },
  {
    spotId: 4,
    userId: 12,
    review:
      "I had a fantastic stay at the Honolulu apartment. The panoramic oceanview from the apartment was absolutely breathtaking and the proximity to the beach was a major highlight. The only reason I couldn't give it a full 5 stars was some minor maintenance issues.",
    stars: 4,
  },
  {
    spotId: 4,
    userId: 8,
    review:
      "I had a fantastic stay at the Honolulu apartment. The panoramic oceanview from the apartment was absolutely breathtaking and the proximity to the beach was a major highlight. The only reason I couldn't give it a full 5 stars was some minor maintenance issues.",
    stars: 4.5,
  },
  {
    spotId: 4,
    userId: 7,
    review:
      "I had a fantastic stay at the Honolulu apartment. The panoramic oceanview from the apartment was absolutely breathtaking and the proximity to the beach was a major highlight. The only reason I couldn't give it a full 5 stars was some minor maintenance issues.",
    stars: 3,
  },
  {
    spotId: 5,
    userId: 1,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4,
  },
  {
    spotId: 5,
    userId: 11,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 5,
  },
  {
    spotId: 5,
    userId: 14,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4,
  },
  {
    spotId: 6,
    userId: 15,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4,
  },
  {
    spotId: 6,
    userId: 13,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 3.2,
  },
  {
    spotId: 6,
    userId: 10,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4.6,
  },
  {
    spotId: 7,
    userId: 3,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 3.2,
  },
  {
    spotId: 7,
    userId: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 3.2,
  },
  {
    spotId: 7,
    userId: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 5,
  },
  {
    spotId: 8,
    userId: 6,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4.1,
  },
  {
    spotId: 8,
    userId: 16,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4.6,
  },
  {
    spotId: 9,
    userId: 14,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 3,
  },
  {
    spotId: 9,
    userId: 8,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4,
  },
  {
    spotId: 10,
    userId: 12,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 5,
  },
  {
    spotId: 10,
    userId: 6,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 4.3,
  },
  {
    spotId: 10,
    userId: 6,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 5,
  },
  {
    spotId: 11,
    userId: 13,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 5,
  },
  {
    spotId: 11,
    userId: 2,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 5,
  },
  {
    spotId: 12,
    userId: 16,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
    stars: 3.5,
  },
  {
    spotId: 13,
    userId: 9,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquet lacus. Nulla elit orci, cursus mattis efficitur a, finibus quis ante. Suspendisse ultrices ultrices lectus, sit amet dignissim ante vehicula non. Ut eleifend dignissim molestie.",
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, reviews, {});
  },
};
