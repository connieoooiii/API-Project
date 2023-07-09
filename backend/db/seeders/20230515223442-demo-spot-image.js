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
    url: "https://seattlecondosandlofts.com/wp-content/uploads/2021/08/Emerald-Condo-5-1024x768.jpg",
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
  {
    spotId: 5,
    url: "https://www.bhg.com/thmb/xwmh0GfK_Z-VlwA4YsXDyfo6cNQ=/1543x0/filters:no_upscale():strip_icc()/two-story-victorian-house-roses-83a1f8e4-0927d3825fa348ed96177b9eb9493e1b.jpg",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://thumbs.cityrealty.com/assets/smart/1004x/webp/1/11/11c1445d4ae14090a31d959b61bd0bf9e8aca3e9/330-wythe-avenue-01.jpg",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://cdn.listingphotos.sierrastatic.com/pics2x/v1687479610/146/146_423747121_01.jpg",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://imgs.6sqft.com/wp-content/uploads/2020/10/07144822/159-west-118th-street-.jpg",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/463513153.jpg?k=c5dd52ab62eb6442f680acc2ba5a23c2e8cb6283abb16a3840dd4d8553bf948a&o=&hp=1",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://media.timeout.com/images/105121437/750/422/image.jpg",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://publish.purewow.net/wp-content/uploads/sites/2/2023/05/beach-house-rentals-in-california-universal.jpg?fit=2050%2C1100",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://www.thegeographicalcure.com/wp-content/uploads/2021/09/img_61560527d8250.",
    preview: true,
  },
  {
    spotId: 13,
    url: "https://www.territorysupply.com/wp-content/uploads/2021/02/mountaintop-airbnb-colorado.jpg",
    preview: true,
  },
  {
    spotId: 14,
    url: "https://www.paulypresleyrealty.com/uploads/downtown-austin-condo.jpg",
    preview: true,
  },
  {
    spotId: 15,
    url: "https://rew-feed-images.global.ssl.fastly.net/realtracs/_cloud_media/property/residential/rtc2533804-1-033fea2aab2673e8388dad641813544e-m.jpg",
    preview: true,
  },
  {
    spotId: 16,
    url: "https://www.nocatee.com/hubfs/001-41HarpersMillDr-PonteVedra-FL-32081-SMALL.jpg",
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
