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
          //1
          ownerId: 1,
          address: "850 Breeze Way",
          city: "Pacifica",
          state: "CA",
          country: "United States of America",
          lat: 37.5935,
          lng: -122.4849,
          name: "Cozy Beach Cottage with Stunning Views",
          description:
            "Welcome to our cozy beach cottage with stunning views! Nestled in the charming coastal town of Pacifica, this charming retreat offers the perfect blend of comfort and tranquility.",
          price: 250,
        },
        {
          //2
          ownerId: 2,
          address: "6500 88th Ave SE",
          city: "Seattle",
          state: "WA",
          country: "United States of America",
          lat: 47.6205,
          lng: -122.3493,
          name: "Private Condo Next to Space Needle",
          description:
            "This modern and stylish retreat offers the perfect combination of comfort and convenience. With stunning views of the city skyline and steps away from the Space Needle, this will be your new home away from home.",
          price: 185,
        },
        {
          //3
          ownerId: 3,
          address: "5499 88th Ave",
          city: "Manhattan",
          state: "NY",
          country: "United States of America",
          lat: 40.7589,
          lng: -73.9851,
          name: "Beautiful Brownstone Condo",
          description:
            "Located in the vibrant neighborhood of Manhattan, you'll be just steps away from world-class dining, shopping, and entertainment. Our beautiful brownstone condo offers an unparalleled experience for those visiting the city.",
          price: 320,
        },
        {
          //4
          ownerId: 4,
          address: "1156 Ocean Ave",
          city: "Honolulu",
          state: "HI",
          country: "United States of America",
          lat: 21.2897,
          lng: -157.8354,
          name: "Panoramic Oceanview Apartment Steps From Beach",
          description:
            "This spacious and modern apartment offers a true beachfront retreat. Escape to paradise with our panoramic oceanview apartment and experience the beauty of Honolulu. Book your stay today and create unforgettable memories in this tropical paradise!",
          price: 290,
        },
        {
          //5
          ownerId: 5,
          address: "1452 Main St",
          city: "San Francisco",
          state: "CA",
          country: "United States of America",
          lat: 37.7749,
          lng: -122.4194,
          name: "Charming Victorian House",
          description:
            "Step back in time and experience the charm of San Francisco with our beautifully restored Victorian house. Located in the heart of the city, this historic gem offers a unique and unforgettable stay.",
          price: 350,
        },
        {
          //6
          ownerId: 6,
          address: "2205 Broadway",
          city: "New York",
          state: "NY",
          country: "United States of America",
          lat: 40.7808,
          lng: -73.9772,
          name: "Luxury Penthouse with Central Park Views",
          description:
            "Indulge in luxury and sophistication with our stunning penthouse overlooking Central Park. This exclusive retreat offers unparalleled comfort and breathtaking views of the city skyline.",
          price: 800,
        },
        {
          //7
          ownerId: 14,
          address: "1001 Market St",
          city: "San Francisco",
          state: "CA",
          country: "United States of America",
          lat: 37.7837,
          lng: -122.4089,
          name: "Modern Loft in the Heart of Downtown",
          description:
            "Immerse yourself in the vibrant atmosphere of downtown San Francisco with our modern loft. With its prime location and contemporary design, this is the perfect base for exploring the city's iconic landmarks and attractions.",
          price: 200,
        },
        {
          //8
          ownerId: 15,
          address: "350 5th Ave",
          city: "New York",
          state: "NY",
          country: "United States of America",
          lat: 40.7486,
          lng: -73.9857,
          name: "Upscale Apartment near Empire State Building",
          description:
            "Experience the epitome of luxury living with our upscale apartment located just steps away from the iconic Empire State Building. Immerse yourself in the vibrant energy of New York City and enjoy world-class amenities and breathtaking views.",
          price: 500,
        },
        {
          //9
          ownerId: 9,
          address: "123 Main St",
          city: "Los Angeles",
          state: "CA",
          country: "United States of America",
          lat: 34.0522,
          lng: -118.2437,
          name: "Modern Studio in Downtown LA",
          description:
            "Discover the allure of downtown Los Angeles with our modern studio. Situated in the heart of the city, this stylish retreat offers easy access to the best restaurants, shopping, and entertainment.",
          price: 150,
        },
        {
          //10
          ownerId: 10,
          address: "4321 Elm St",
          city: "Chicago",
          state: "IL",
          country: "United States of America",
          lat: 41.8781,
          lng: -87.6298,
          name: "Chic Loft in Trendy Neighborhood",
          description:
            "Immerse yourself in the vibrant atmosphere of Chicago's trendy neighborhood with our chic loft. Boasting modern design and a prime location, this stylish retreat is the perfect choice for urban explorers.",
          price: 220,
        },
        {
          //11
          ownerId: 10,
          address: "987 Oak St",
          city: "San Diego",
          state: "CA",
          country: "United States of America",
          lat: 32.7157,
          lng: -117.1611,
          name: "Beachfront Villa with Private Pool",
          description:
            "Escape to paradise with our beachfront villa in sunny San Diego. Indulge in luxury and relaxation as you soak up the sun and enjoy breathtaking ocean views from your private pool.",
          price: 450,
        },
        {
          //12
          ownerId: 12,
          address: "2468 Pine St",
          city: "Boston",
          state: "MA",
          country: "United States of America",
          lat: 42.3601,
          lng: -71.0589,
          name: "Historic Townhouse in Beacon Hill",
          description:
            "Experience the charm of historic Beacon Hill with our beautifully restored townhouse. Immerse yourself in Boston's rich history and enjoy the elegance and comfort of this unique accommodation.",
          price: 380,
        },
        {
          //13
          ownerId: 13,
          address: "3698 Vine St",
          city: "Denver",
          state: "CO",
          country: "United States of America",
          lat: 39.7392,
          lng: -104.9903,
          name: "Mountain Retreat with Scenic Views",
          description:
            "Escape the hustle and bustle of the city and retreat to our peaceful mountain getaway. Surrounded by breathtaking nature and panoramic views, this is the perfect spot to unwind and reconnect with nature.",
          price: 280,
        },
        {
          //14
          ownerId: 5,
          address: "5678 Maple Ave",
          city: "Austin",
          state: "TX",
          country: "United States of America",
          lat: 30.2672,
          lng: -97.7431,
          name: "Hip and Modern Condo in Downtown Austin",
          description:
            "Immerse yourself in the vibrant music and arts scene of Austin with our hip and modern condo. Located in the heart of downtown, this stylish retreat offers easy access to the city's best attractions and nightlife.",
          price: 210,
        },
        {
          //15
          ownerId: 15,
          address: "789 Walnut St",
          city: "Nashville",
          state: "TN",
          country: "United States of America",
          lat: 36.1627,
          lng: -86.7816,
          name: "Cozy Cottage in Music City",
          description:
            "Experience the magic of Music City with our cozy cottage in Nashville. Located in a vibrant neighborhood, this charming retreat offers a true taste of Southern hospitality and easy access to the city's iconic music venues.",
          price: 190,
        },
        {
          //16
          ownerId: 12,
          address: "1010 Pineapple Ave",
          city: "Orlando",
          state: "FL",
          country: "United States of America",
          lat: 28.5383,
          lng: -81.3792,
          name: "Family-Friendly Home near Theme Parks",
          description:
            "Create unforgettable memories with your family at our spacious and family-friendly home near Orlando's famous theme parks. With its convenient location and modern amenities, this is the perfect base for your Orlando adventures.",
          price: 320,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options,
      {ownerId: {[Op.in]: [1, 2, 3, 4]}},
      {}
    );
  },
};
