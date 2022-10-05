const { verifyToken } = require("../helper/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw { name: "MissingToken" };
    const decoded = verifyToken(req.headers.authorization);
    if (!decoded) throw { name: "InvalidToken" };
    const user = decoded;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") throw { name: "Unauthorized" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware, isAdmin };
