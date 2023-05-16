"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const reviewImgs = [
  {
    reviewId: 1,
    url: "https://www.example.com/images/random-pic4.jpg",
  },
  {
    reviewId: 2,
    url: "https://www.example.com/images/random-image5.png",
  },
  {
    reviewId: 3,
    url: "https://www.example.com/images/random-photo6.jpeg",
  },
  {
    reviewId: 4,
    url: "https://www.example.com/images/random-pic7.jpg",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(options, reviewImgs, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options.tableName, {}, {});
  },
};
