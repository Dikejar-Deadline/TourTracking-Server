const { sign, verify } = require("jsonwebtoken");

function generateToken(payload) {
  return sign(payload, process.env.JWT_SECRET);
}

function decodeToken(token) {
  return verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, decodeToken };
