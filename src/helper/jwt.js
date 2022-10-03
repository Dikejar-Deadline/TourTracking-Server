const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  return {
    access_token: sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 60 }),
  };
};

const verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET);
};

module.exports = { createToken, verifyToken };
