"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Destination.hasMany(models.Room, {
      //   foreignKey: "DestinationId",
      // });
    }
  }
  Destination.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "name cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "description cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "description cannot be empty",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "image cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "image cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Destination",
    }
  );
  return Destination;
};
