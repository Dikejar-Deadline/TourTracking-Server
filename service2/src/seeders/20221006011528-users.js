"use strict";

const { hashPassword } = require("../helper/bcrypt");

/*@type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = require("./db.json").users.map((user) => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.password = hashPassword(user.password);
      return user;
    });
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
