"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "firstName is required",
          notEmpty: "firstName is required",
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "lastName is required",
          notEmpty: "lastName is required",
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "username is required",
          notEmpty: "username is required",
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default.png",
        validate: {
          notNull: "picture is required",
          notEmpty: "picture is required",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "email is required",
          notEmpty: "email is required",
          isEmail: { msg: "email is not valid" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "phoneNumber is required",
          notEmpty: "phoneNumber is required",
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "address is required",
          notEmpty: "address is required",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "password is required",
          notEmpty: "password is required",
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
          notNull: "role is required",
          notEmpty: "role is required",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
