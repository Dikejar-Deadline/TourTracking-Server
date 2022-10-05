const RoomController = require("../controllers/room.controller");
const { authMiddleware, isMineRoom } = require("../middlewares/auth");

const roomRouter = require("express").Router();

roomRouter.get("/", RoomController.getRooms);
roomRouter.post("/", authMiddleware, RoomController.createRoom);
roomRouter.get("/:id", RoomController.getRoomById);
roomRouter.get(
  "/destination/:DestinationId",
  RoomController.getRoomByDestinationId
);
roomRouter.get("/user/:UserId", authMiddleware, RoomController.getRoomByUser);
roomRouter.put("/:id", authMiddleware, isMineRoom, RoomController.editRoom);
roomRouter.delete(
  "/:id",
  authMiddleware,
  isMineRoom,
  RoomController.deleteRoom
);

module.exports = roomRouter;
