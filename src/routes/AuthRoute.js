const AuthController = require("../controller/AuthController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const AuthRoute = require("express").Router();

AuthRoute.post("/register", AuthController.register);
AuthRoute.post("/login", AuthController.login);
AuthRoute.get("/by-token", authMiddleware, AuthController.byToken);
AuthRoute.get("/user", authMiddleware, isAdmin, AuthController.index);

module.exports = AuthRoute;
