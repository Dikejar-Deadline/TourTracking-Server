"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "price cannot be null",
          notEmpty: "price cannot be empty",
        },
      },
      accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "accountNumber cannot be null",
          notEmpty: "accountNumber cannot be empty",
        },
      },
      accountName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "accountName cannot be null",
          notEmpty: "accountName cannot be empty",
        },
      },
      maxParticipant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "maxParticipant cannot be null",
          notEmpty: "maxParticipant cannot be empty",
        },
      },
      minParticipant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "minParticipant cannot be null",
          notEmpty: "minParticipant cannot be empty",
        },
      },
      schedule: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: "schedule cannot be null",
          notEmpty: "schedule cannot be empty",
        },
      },
      dropPoint: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "dropPoint cannot be null",
          notEmpty: "dropPoint cannot be empty",
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "duration cannot be null",
          notEmpty: "duration cannot be empty",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "status cannot be null",
          notEmpty: "status cannot be empty",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "UserId cannot be null",
          notEmpty: "UserId cannot be empty",
        },
      },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
