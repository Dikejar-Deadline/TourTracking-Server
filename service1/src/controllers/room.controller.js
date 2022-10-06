const { Room, Destination, Participant } = require("../models");

class RoomController {
  static async getRooms(req, res, next) {
    try {
      const room = await Room.findAll({
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

  static async createRoom(req, res, next) {
    try {
      const {
        price,
        accountNumber,
        accountName,
        maxParticipant,
        minParticipant,
        schedule,
        dropPoint,
        duration,
        status,
        DestinationId,
      } = req.body;
      const room = await Room.create({
        price,
        accountNumber,
        accountName,
        maxParticipant,
        minParticipant,
        schedule,
        dropPoint,
        duration,
        status,
        UserId: +req.user.id,
        DestinationId: +DestinationId,
      });
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
          {
            model: Participant,
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
            include: [
              {
                model: Participant,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
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

      const {
        price,
        accountNumber,
        accountName,
        maxParticipant,
        minParticipant,
        schedule,
        dropPoint,
        duration,
        status,
        DestinationId,
      } = req.body;
      if (!DestinationId) throw { name: "RequiredDestinationId" };
      const destination = await Destination.findByPk(+DestinationId);
      if (!destination) throw { name: "MissingDestination" };

      room.update({
        price,
        accountNumber,
        accountName,
        maxParticipant,
        minParticipant,
        schedule,
        dropPoint,
        duration,
        status,
        DestinationId: +DestinationId,
      });
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
      res.status(200).json(true);
    } catch (error) {
      next(error);
    }
  }

  static async joinRoom(req, res, next) {
    try {
      const UserId = +req.user.id;
      const RoomId = +req.params.id;
      const alreadyJoin = await Participant.findAll({
        where: {
          UserId,
        },
      });
      if (alreadyJoin.length > 0) throw { name: "AlreadyJoin" };
      await Participant.create({
        UserId,
        RoomId,
      });
      res.json(true);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
