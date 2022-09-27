const { Room, Destination } = require("../models");

class RoomController {
  static async getRooms(req, res, next) {
    try {
      const room = await Room.findAll();
      res.status(200).json(room);
    } catch (error) {
      console.log();
    }
  }

  static async createRoom(req, res, next) {
    try {
      let { price, accountNumber, accountName, maxParticipant, minParticipant, schedule, dropPoint, duration, status, userId } = req.body;
      let input = {
        price,
        accountNumber,
        accountName,
        maxParticipant,
        minParticipant,
        schedule,
        dropPoint,
        duration,
        status,
        userId,
      };
      const room = await Room.create(input, {
        include: [
          {
            model: Destination,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(201).json(room);
    } catch (error) {
      console.log(error);
    }
  }

  static async getRoomById(req, res, next) {
    try {
      const id = +req.params.id;
      const room = await Room.findByPk(id, {
        include: [
          {
            model: Destination,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(room);
    } catch (error) {
      console.log(error);
    }
  }

  static async editRoom(req, res, next) {
    try {
      const id = +req.params.id;
      let { price, accountNumber, accountName, maxParticipant, minParticipant, schedule, dropPoint, duration, status, userId } = req.body;
      let input = {
        price,
        accountNumber,
        accountName,
        maxParticipant,
        minParticipant,
        schedule,
        dropPoint,
        duration,
        status,
        userId,
      };
      const room = await Room.put(input, {
        where: {
          id: id,
        },
        include: [
          {
            model: Destination,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(room);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      const id = +req.params.id;
      const room = await Room.destroy({ where: { id: id } });
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
