const DestinationController = require("../controllers/destination.controller");
const { authMiddleware, isAdmin } = require("../middlewares/auth");

const destinationRouter = require("express").Router();

destinationRouter.get("/", DestinationController.getDestinations);
destinationRouter.get("/:id", DestinationController.getDestinationById);
destinationRouter.use(authMiddleware);
destinationRouter.use(isAdmin);
destinationRouter.post("/", DestinationController.createDestination);
destinationRouter.put("/:id", DestinationController.editDestination);
destinationRouter.delete("/:id", DestinationController.deleteDestination);

module.exports = destinationRouter;
