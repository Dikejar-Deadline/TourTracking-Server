const DestinationController = require("../controllers/destination.controller");

const destinationRouter = require("express").Router();

destinationRouter.get("/", DestinationController.getDestinations);
destinationRouter.post("/", DestinationController.createDestination);
destinationRouter.get("/:id", DestinationController.getDestinationById);
destinationRouter.put("/:id", DestinationController.editDestination);
destinationRouter.delete("/:id", DestinationController.deleteDestination);

module.exports = destinationRouter;
