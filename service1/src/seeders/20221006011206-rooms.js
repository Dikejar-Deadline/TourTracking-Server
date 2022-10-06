"use strict";

/*@type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let now = new Date();
    let rooms = require("./db.json").rooms.map((room) => {
      room.createdAt = now;
      room.updatedAt = now;
      return room;
    });
    await queryInterface.bulkInsert("Rooms", rooms, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Rooms", null, {});
  },
};
