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
      Room.belongsTo(models.Destination, {
        foreignKey: "DestinationId",
      });
    }
  }
  Room.init(
    {
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "price cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "price cannot be empty",
          },
        },
      },
      accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "accountNumber cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "accountNumber cannot be empty",
          },
        },
      },
      accountName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "accountName cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "accountName cannot be empty",
          },
        },
      },
      maxParticipant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "maximal participant cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "maximal participant cannot be empty",
          },
        },
      },
      minParticipant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "minimal participant cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "minimal participant cannot be empty",
          },
        },
      },
      schedule: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "schedule cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "schedule cannot be empty",
          },
        },
      },
      dropPoint: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "drop point cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "drop point cannot be empty",
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "duration cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "duration cannot be empty",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "status cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "status cannot be empty",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "user id cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "user id cannot be empty",
          },
        },
      },
      DestinationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "destination id cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "destination id cannot be empty",
          },
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
