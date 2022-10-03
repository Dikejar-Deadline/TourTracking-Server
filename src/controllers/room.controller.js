const { Room, Destination } = require("../models");

class RoomController {
  static async getRooms(req, res, next) {
    try {
      const room = await Room.findAll();
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }

  static async createRoom(req, res, next) {
    console.log(req.body);
    try {
      let { price, accountNumber, accountName, maxParticipant, minParticipant, schedule, dropPoint, duration, status, UserId, DestinationId } = req.body;
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
        UserId: +UserId,
        DestinationId: +DestinationId,
      };
      const room = await Room.create(input);
      res.status(201).json(room);
    } catch (error) {
      next(error);
    }
  }

  static async getRoomById(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw { name: "RequiredRoomId" };
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
      next(error);
    }
  }

  static async getRoomByDestinationId(req, res, next) {
    try {
      let { DestinationId } = req.params;
      if (!DestinationId) throw { name: "RequiredDestinationId" };
      const destination = await Destination.findByPk(+DestinationId, {
        include: [
          {
            model: Room,
          },
        ],
      });
      if (!destination) throw { name: "MissingDestination" };
      res.status(200).json(destination);
    } catch (error) {
      next(error);
    }
  }

  static async getRoomByUser(req, res, next) {
    try {
      const UserId = +req.user.id;
      if (!UserId) throw { name: "MissingUserId" };
      const room = await Room.findAll({
        where: {
          UserId,
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
      next(error);
    }
  }

  static async editRoom(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw { name: "RequiredRoomId" };

      const room = await Room.findByPk(id);
      if (!room) throw { name: "MissingRoom" };

      let { price, accountNumber, accountName, maxParticipant, minParticipant, schedule, dropPoint, duration, status, UserId, DestinationId } = req.body;
      if (!DestinationId) throw { name: "RequiredDestinationId" };
      const destination = await Destination.findByPk(+DestinationId);
      if (!destination) throw { name: "MissingDestination" };

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
        UserId: +UserId,
        DestinationId: +DestinationId,
      };

      room.update(input);
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw { name: "RequiredRoomId" };
      const room = await Room.findByPk(id);
      if (!room) throw { name: "MissingRoom" };
      room.destroy();
      res.status(200).json({ message: `success delete room with id ${id}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
