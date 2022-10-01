const router = require("express").Router();
const Controller = require("../controllers/auth.controller");

router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.post("/login-google", Controller.loginGoogle);

module.exports = router;
