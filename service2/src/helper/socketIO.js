const { Server } = require("socket.io");
const { Location } = require("./../models");

const runSocketIO = (httpServer) => {
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
      try {
        console.log(latitude, longitude, UserId, RoomId);
        if (longitude && latitude && UserId && RoomId) {
          await Location.destroy({
            where: {
              UserId,
            },
          });
          await Location.create({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            RoomId: RoomId.toString(),
            UserId: UserId.toString(),
          });
          const location = await Location.findAll(
            {
              where: {
                RoomId: RoomId.toString(),
              },
            },
            {
              attributes: { exclude: ["createdAt", "updatedAt"] },
            }
          );

          io.to(RoomId).emit("location", location);
        } else {
          const location = await Location.findAll(
            {
              where: {
                RoomId: RoomId.toString(),
              },
            },
            {
              attributes: { exclude: ["createdAt", "updatedAt"] },
            }
          );
          io.to(RoomId).emit("location", location);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
  });
};

module.exports = { runSocketIO };
