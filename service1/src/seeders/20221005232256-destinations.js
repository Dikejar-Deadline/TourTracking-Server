"use strict";

/*@type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let now = new Date();
    let destinations = require("./db.json").destinations.map((destination) => {
      destination.createdAt = now;
      destination.updatedAt = now;
      return destination;
    });
    await queryInterface.bulkInsert("Destinations", destinations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Destinations", null, {});
  },
};
