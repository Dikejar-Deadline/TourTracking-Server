if (process.env.NODE_ENV !== "production") require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USERNAME_DEV,
    password: process.env.PASSWORD_DEV,
    database: process.env.DATABASE_DEV_SER2,
    host: process.env.HOST_DEV,
    dialect: process.env.DIALECT_DEV,
  },
};
