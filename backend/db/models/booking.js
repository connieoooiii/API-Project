"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          startingDate(value) {
            if (value > this.endDate) {
              throw new Error("Your start date must be before your end date.");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
