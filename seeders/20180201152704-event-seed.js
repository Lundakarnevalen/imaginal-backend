"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Events",
      [
        {
          name: "Awesome sittning",
          date: "2018-06-1",
          startTime: "12:00:00",
          nbrSeats: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Gris",
          date: "2018-06-2",
          startTime: "23:00:00",
          nbrSeats: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Events", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
