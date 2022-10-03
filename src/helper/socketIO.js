const { createServer } = require("http");
const { Server } = require("socket.io");
const { Location } = require("./../models");

const runSocketIO = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("join", async ({ RoomId }) => {
      console.log("joining room: " + RoomId);
      socket.join(RoomId);
    });

    socket.on("coord", async ({ latitude, longitude, RoomId, UserId }) => {
      console.log("retriving coords from: " + RoomId);
      console.log(
        `Coord: latitude: ${latitude} longitude: ${longitude}, user: ${UserId} in room ${RoomId}`
      );
      await Location.createOrUpdate({
        latitude,
        longitude,
        RoomId,
        UserId,
      });
      const location = await Location.findAll({
        where: {
          RoomId,
        },
      });
      io.to(RoomId).emit("location", location);
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
  });

  return httpServer;
};

module.exports = { runSocketIO };
