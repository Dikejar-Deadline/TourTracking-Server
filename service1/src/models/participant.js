"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.belongsTo(models.Room, {
        foreignKey: "RoomId",
      });
    }
  }
  Participant.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "UserId cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "UserId cannot be empty",
          },
        },
      },
      RoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "RoomId cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "RoomId cannot be empty",
          },
        },
      },
      paymentStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: {
            args: true,
            msg: "paymentStatus cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "paymentStatus cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Participant",
    }
  );
  return Participant;
};
