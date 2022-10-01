const { User } = require("../models");
const { decodeToken } = require("../helpers/jwt");

const authenticate = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    access_token = decodeToken(access_token);

    let { id } = access_token;
    let result = await User.findByPk(id);
    if (!result) throw { name: "Unauthenticated" };
    req.user = {
      id: result.id,
      username: result.username,
      email: result.email,
      phoneNumber: result.phoneNumber,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticate };
