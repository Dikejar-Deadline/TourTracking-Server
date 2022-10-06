"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "UserId is required",
          },
          notNull: {
            args: true,
            msg: "UserId is required",
          },
        },
      },
      RoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "RoomId is required",
          },
          notNull: {
            args: true,
            msg: "RoomId is required",
          },
        },
      },
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "paymentStatus is required",
          },
          notNull: {
            args: true,
            msg: "paymentStatus is required",
          },
        },
      },
      vaNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "vaNumber is required",
          },
          notNull: {
            args: true,
            msg: "vaNumber is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
