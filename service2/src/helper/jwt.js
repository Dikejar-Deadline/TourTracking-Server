const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  return {
    access_token: sign(user, "toutracking", { expiresIn: 60 * 60 }),
  };
};

const verifyToken = (token) => {
  return verify(token, "toutracking");
};

module.exports = { createToken, verifyToken };
