const RoomController = require("../controllers/room.controller");
const { authMiddleware, isMineRoom } = require("../middlewares/auth");

const roomRouter = require("express").Router();

roomRouter.get("/", RoomController.getRooms);
roomRouter.get("/:id", RoomController.getRoomById);
roomRouter.get(
  "/destination/:DestinationId",
  RoomController.getRoomByDestinationId
);
roomRouter.use(authMiddleware);
roomRouter.post("/:id/join-room`", RoomController.joinRoom);
roomRouter.post("/", RoomController.createRoom);
roomRouter.get("/user/:UserId", RoomController.getRoomByUser);
roomRouter.use(isMineRoom);
roomRouter.put("/:id", RoomController.editRoom);
roomRouter.delete("/:id", RoomController.deleteRoom);

module.exports = roomRouter;
