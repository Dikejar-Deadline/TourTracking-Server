const AuthController = require("../controller/AuthController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { Location } = require("./../models");

const AuthRoute = require("express").Router();

AuthRoute.post("/register", AuthController.register);
AuthRoute.post("/login", AuthController.login);
AuthRoute.get("/by-token", authMiddleware, AuthController.byToken);
AuthRoute.get("/user", authMiddleware, isAdmin, AuthController.index);
AuthRoute.get("/location", async (req, res, next) => {
  await Location.destroy({
    where: {
      RoomId: "2022",
    },
  });
  const location = await Location.findAll();
  res.json(location);
});

module.exports = AuthRoute;
