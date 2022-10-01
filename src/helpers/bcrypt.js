const { genSaltSync, hashSync, compareSync } = require("bcryptjs");

function hashPassword(password) {
  const salt = genSaltSync(10);
  password = hashSync(password, salt);
  return password;
}

function comparePassword(password, hashed) {
  return compareSync(password, hashed);
}
module.exports = { hashPassword, comparePassword };
