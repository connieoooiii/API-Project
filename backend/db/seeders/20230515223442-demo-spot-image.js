"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const images = [
  {
    spotId: 1,
    url: "https://cdn10.phillymag.com/wp-content/uploads/sites/3/2019/07/tiny-beach-house-838x1024.jpg",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://media.bizj.us/view/img/10969364/common*1024xx3600-2030-0-314.jpg",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://thumbs.cityrealty.com/assets/smart/1004x/webp/4/43/432e332803fc6a16f745d9ee3f70be69bcb4095f/59-west-83rd-street-1.jpg",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://media-cdn.tripadvisor.com/media/vr-splice-j/05/b2/4f/1b.jpg",
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, images, {});
  },
};
