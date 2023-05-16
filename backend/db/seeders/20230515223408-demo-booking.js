"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const bookings = [
  {
    spotId: 1,
    userId: 2,
    startDate: "2023-04-01",
    endDate: "2023-04-15",
  },
  {
    spotId: 2,
    userId: 3,
    startDate: "2023-02-14",
    endDate: "2023-02-21",
  },
  {
    spotId: 3,
    userId: 4,
    startDate: "2023-01-11",
    endDate: "2023-01-23",
  },
  {
    spotId: 4,
    userId: 1,
    startDate: "2023-03-18",
    endDate: "2023-03-28",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(options, bookings, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";

    return queryInterface.bulkDelete(options.tableName, {}, {});
  },
};
