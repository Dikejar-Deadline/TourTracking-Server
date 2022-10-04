const destinationRouter = require("./destination.route");
const roomRouter = require("./room.route");
const paymentRouter = require("./payment.route");

const router = require("express").Router();

router.use("/rooms", roomRouter);
router.use("/destinations", destinationRouter);
router.use("/payment", paymentRouter);

module.exports = router;
