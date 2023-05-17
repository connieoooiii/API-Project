"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const images = [
  {
    spotId: 1,
    url: "https://www.example.com/images/random-image.jpg",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://www.example.com/images/random-pic1.jpg",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://www.example.com/images/random-image2.png",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://www.example.com/images/random-photo3.jpeg",
    preview: true,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, images, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";

    return queryInterface.bulkDelete(options.tableName, {}, {});
  },
};
