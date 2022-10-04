const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const hashPassword = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

const comparePassword = (password, dbPassword) => {
  return compareSync(password, dbPassword);
};

module.exports = { hashPassword, comparePassword };
