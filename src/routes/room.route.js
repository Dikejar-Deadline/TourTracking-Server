const RoomController = require("../controllers/room.controller");

const roomRouter = require("express").Router();

roomRouter.get("/", RoomController.getRooms);
roomRouter.post("/", RoomController.createRoom);
roomRouter.get("/:id", RoomController.getRoomById);
roomRouter.get("/destination/:DestinationId", RoomController.getRoomByDestinationId);
roomRouter.get("/:UserId", RoomController.getRoomByUser);
roomRouter.put("/:id", RoomController.editRoom);
roomRouter.delete("/:id", RoomController.deleteRoom);

module.exports = roomRouter;
