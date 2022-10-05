const { authMiddleware } = require("../middlewares/auth");
const destinationRouter = require("./destination.route");
const roomRouter = require("./room.route");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({
    msg: "Destination and room service",
  });
});

router.use("/rooms", roomRouter);
router.use("/destinations", destinationRouter);

module.exports = router;
