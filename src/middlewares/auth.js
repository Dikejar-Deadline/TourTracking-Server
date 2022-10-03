const { decodeToken } = require("../helpers/jwt");
const { Room } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.access_token;
    if (!token) throw { name: "MissingToken" };

    const decoded = decodeToken(token);
    if (!decoded) throw { name: "InvalidToken" };

    const user = decoded;
    if (!user) throw { name: "InvalidToken" };

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware };
