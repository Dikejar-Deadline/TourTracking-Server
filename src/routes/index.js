const destinationRouter = require("./destination.route");
const roomRouter = require("./room.route");

const router = require("express").Router();

router.use("/rooms", roomRouter);
router.use("/destinations", destinationRouter);

module.exports = roomRouter;
