"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async createOrUpdate({ RoomId, UserId, latitude, longitude }) {
      try {
        const isExist = await this.findOne({
          where: {
            RoomId,
            UserId,
          },
        });
        if (!isExist) this.create({ latitude, longitude, RoomId, UserId });
        if (isExist)
          isExist.update({
            latitude,
            longitude,
          });
      } catch (error) {
        return error;
      }
    }
  }
  Location.init(
    {
      latitude: {
        type: DataTypes.STRING,
        validate: {
          min: -90,
          max: 90,
        },
      },
      longitude: {
        type: DataTypes.INTEGER,
        validate: {
          min: -180,
          max: 180,
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: "UserId is required",
        },
      },
      RoomId: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: "RoomId is required",
        },
      },
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
